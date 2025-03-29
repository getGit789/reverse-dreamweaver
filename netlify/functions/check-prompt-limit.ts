/// <reference types="node" />
import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';

// Create a single PrismaClient instance that will be reused across function invocations
let prismaInstance: PrismaClient | null = null;

async function getPrismaClient(): Promise<PrismaClient> {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    try {
      // Test connection
      await prismaInstance.$queryRaw`SELECT 1`;
      console.log('Successfully connected to PostgreSQL database');
      return prismaInstance;
    } catch (error) {
      console.error('Error connecting to database:', error);
      
      if (prismaInstance) {
        await prismaInstance.$disconnect();
        prismaInstance = null;
      }
      
      throw error;
    }
  }
  
  return prismaInstance;
}

const DAILY_PROMPT_LIMIT = 3;

export const handler: Handler = async (event) => {
  console.log('Received request:', {
    method: event.httpMethod,
    path: event.path,
    body: event.body
  });

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Parse the body
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing request body' }),
    };
  }

  // Extract the user ID from the request
  const { userId, action } = JSON.parse(event.body);

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User ID is required' }),
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let client;
  
  try {
    client = await getPrismaClient();
  } catch (dbError) {
    console.error('Database connection error:', dbError);
    // Fallback behavior when DB connection fails - gracefully continue with defaults
    console.log('Using fallback prompt tracking due to database error');
    
    // For increment action, just return success without actually incrementing
    if (action === 'increment') {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          success: true,
          notice: 'Using fallback mechanism due to database error' 
        }),
      };
    }
    
    // For checking limits, always return permissive defaults
    const fallbackResponse = {
      canUsePrompt: true,
      remainingPrompts: 3,
      totalUsed: 0,
      notice: 'Using fallback mechanism due to database error'
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(fallbackResponse),
    };
  }

  if (action === 'increment') {
    console.log('Incrementing prompt count for user:', userId);
    try {
      const result = await client.userPrompt.upsert({
        where: { userId },
        create: {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          userId,
          promptCount: 1,
          lastResetDate: today,
          updatedAt: new Date()
        },
        update: {
          promptCount: {
            increment: 1
          },
          updatedAt: new Date()
        }
      });
      console.log('Increment result:', result);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ success: true }),
      };
    } catch (upsertError) {
      console.error('Error incrementing prompt count:', upsertError);
      // Fallback behavior for increment errors
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          success: true,
          notice: 'Using fallback mechanism due to database error' 
        }),
      };
    }
  }

  console.log('Checking prompt limit for user:', userId);
  let userPrompt;
  
  try {
    userPrompt = await client.userPrompt.findUnique({
      where: { userId }
    });
    console.log('Found user prompt:', userPrompt);
  } catch (findError) {
    console.error('Error finding user prompt:', findError);
    // Fallback for user lookup errors
    const fallbackResponse = {
      canUsePrompt: true,
      remainingPrompts: 3,
      totalUsed: 0,
      notice: 'Using fallback mechanism due to database error'
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(fallbackResponse),
    };
  }

  // If no record exists, create one
  if (!userPrompt) {
    console.log('Creating new user prompt record');
    try {
      userPrompt = await client.userPrompt.create({
        data: {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          userId,
          promptCount: 0,
          lastResetDate: today,
          updatedAt: new Date()
        }
      });
      console.log('Created user prompt:', userPrompt);
    } catch (createError) {
      console.error('Error creating user prompt:', createError);
      // Fallback for user creation errors
      const fallbackResponse = {
        canUsePrompt: true,
        remainingPrompts: 3,
        totalUsed: 0,
        notice: 'Using fallback mechanism due to database error'
      };
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify(fallbackResponse),
      };
    }
  }

  // Check if we need to reset the counter (new day)
  if (userPrompt.lastResetDate < today) {
    console.log('Resetting prompt count for new day');
    try {
      userPrompt = await client.userPrompt.update({
        where: { userId },
        data: {
          promptCount: 0,
          lastResetDate: today,
          updatedAt: new Date()
        }
      });
      console.log('Reset result:', userPrompt);
    } catch (updateError) {
      console.error('Error resetting prompt count:', updateError);
      // Fallback for update errors
      const fallbackResponse = {
        canUsePrompt: true,
        remainingPrompts: 3,
        totalUsed: 0,
        notice: 'Using fallback mechanism due to database error'
      };
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify(fallbackResponse),
      };
    }
  }

  const response = {
    canUsePrompt: userPrompt.promptCount < DAILY_PROMPT_LIMIT,
    remainingPrompts: DAILY_PROMPT_LIMIT - userPrompt.promptCount,
    totalUsed: userPrompt.promptCount
  };
  console.log('Sending response:', response);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    },
    body: JSON.stringify(response),
  };
}; 