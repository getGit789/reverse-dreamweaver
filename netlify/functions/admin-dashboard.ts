import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';

// Create a PrismaClient instance
let prismaInstance: PrismaClient | null = null;

async function getPrismaClient(): Promise<PrismaClient> {
  if (!prismaInstance) {
    console.log('Creating new Prisma client instance for admin dashboard');
    
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

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Only allow POST requests
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

  // Handle OPTIONS for CORS
  if (event.httpMethod as string === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: '',
    };
  }

  try {
    // Parse the request body
    const { action } = JSON.parse(event.body || '{}');
    console.log('Admin dashboard action:', action);

    if (!action) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ error: 'Missing action parameter' }),
      };
    }

    // Get Prisma client
    const client = await getPrismaClient();

    if (action === 'fetchAllUserPrompts') {
      // Fetch all user prompts
      const userPrompts = await client.userPrompt.findMany({
        orderBy: {
          updatedAt: 'desc'
        }
      });

      console.log(`Found ${userPrompts.length} user prompts`);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ userPrompts }),
      };
    }

    // Unknown action
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Unknown action' }),
    };
  } catch (error) {
    console.error('Error in admin-dashboard function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
}; 