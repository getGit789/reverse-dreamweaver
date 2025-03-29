import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';

// Create a single PrismaClient instance that will be reused across function invocations
let prismaInstance: PrismaClient | null = null;

async function getPrismaClient(): Promise<PrismaClient> {
  if (!prismaInstance) {
    console.log('Creating new Prisma client instance');
    
    // Define potential database URLs to try
    const dbUrls = [
      'file:./prisma/dev.db',
      'file:../../../prisma/dev.db',
      'file:../../prisma/dev.db'
    ];
    
    let error = null;
    
    // Try each URL until one works
    for (const dbUrl of dbUrls) {
      try {
        console.log(`Trying database URL: ${dbUrl}`);
        
        prismaInstance = new PrismaClient({
          datasources: {
            db: { url: dbUrl }
          }
        });
        
        await prismaInstance.$connect();
        
        // Verify the table exists by running a simple query
        const tables = await prismaInstance.$queryRaw`
          SELECT name FROM sqlite_master WHERE type='table' AND name='UserPrompt';
        `;
        console.log('Tables query result:', tables);
        
        // If the UserPrompt table doesn't exist, create it
        if (Array.isArray(tables) && tables.length === 0) {
          console.log('UserPrompt table does not exist, creating it');
          
          // Create the UserPrompt table directly with SQL
          await prismaInstance.$executeRaw`
            CREATE TABLE IF NOT EXISTS "UserPrompt" (
              "id" TEXT NOT NULL PRIMARY KEY,
              "userId" TEXT NOT NULL UNIQUE,
              "promptCount" INTEGER NOT NULL DEFAULT 0,
              "lastResetDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updatedAt" DATETIME NOT NULL
            );
            
            CREATE UNIQUE INDEX IF NOT EXISTS "UserPrompt_userId_key" ON "UserPrompt"("userId");
            CREATE INDEX IF NOT EXISTS "UserPrompt_userId_idx" ON "UserPrompt"("userId");
            CREATE INDEX IF NOT EXISTS "UserPrompt_lastResetDate_idx" ON "UserPrompt"("lastResetDate");
          `;
          console.log('Successfully created UserPrompt table');
        }
        
        // If we get here, connection worked
        console.log(`Successfully connected to database at: ${dbUrl}`);
        return prismaInstance;
        
      } catch (err) {
        console.error(`Failed to connect using ${dbUrl}:`, err);
        error = err;
        
        // Clean up before trying next URL
        if (prismaInstance) {
          await prismaInstance.$disconnect();
          prismaInstance = null;
        }
      }
    }
    
    // If we get here, all URLs failed
    console.error('Failed to connect to database with all URLs');
    throw error || new Error('Failed to connect to database');
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

  try {
    const { userId, action } = JSON.parse(event.body || '{}');
    console.log('Parsed request body:', { userId, action });

    if (!userId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ error: 'User ID is required' }),
      };
    }

    const client = await getPrismaClient();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
        throw upsertError;
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
      throw findError;
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
        throw createError;
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
        throw updateError;
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
  } catch (error) {
    console.error('Error in check-prompt-limit:', error);
    
    // Ensure error is properly formatted as JSON
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      try {
        errorMessage = JSON.stringify(error);
      } catch {
        errorMessage = 'Error object could not be stringified';
      }
    }
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Failed to check prompt limit',
        details: errorMessage
      }),
    };
  }
}; 