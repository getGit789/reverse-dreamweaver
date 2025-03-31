/// <reference types="node" />
import { Pool } from 'pg';
import { Handler } from '@netlify/functions';

const DAILY_PROMPT_LIMIT = 3;

// Create a new pool using the DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing request body' }),
    };
  }

  const { userId, action } = JSON.parse(event.body);

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User ID is required' }),
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const client = await pool.connect();
    
    try {
      if (action === 'increment') {
        console.log('Incrementing prompt count for user:', userId);
        
        // First, check if user exists and get their current count
        const checkResult = await client.query(
          'SELECT prompt_count, last_reset_date FROM user_prompts WHERE user_id = $1',
          [userId]
        );

        if (checkResult.rows.length === 0) {
          // User doesn't exist, create new record
          await client.query(
            'INSERT INTO user_prompts (user_id, prompt_count, last_reset_date) VALUES ($1, 1, $2)',
            [userId, today]
          );
        } else {
          // User exists, check if we need to reset count
          const lastResetDate = new Date(checkResult.rows[0].last_reset_date);
          if (lastResetDate < today) {
            // New day, reset count to 1
            await client.query(
              'UPDATE user_prompts SET prompt_count = 1, last_reset_date = $2 WHERE user_id = $1',
              [userId, today]
            );
          } else {
            // Same day, increment count
            await client.query(
              'UPDATE user_prompts SET prompt_count = prompt_count + 1 WHERE user_id = $1',
              [userId]
            );
          }
        }

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
      }

      // Check prompt limit
      console.log('Checking prompt limit for user:', userId);
      
      const result = await client.query(
        'SELECT prompt_count, last_reset_date FROM user_prompts WHERE user_id = $1',
        [userId]
      );

      let promptCount = 0;
      let lastResetDate = today;

      if (result.rows.length > 0) {
        const row = result.rows[0];
        lastResetDate = new Date(row.last_reset_date);
        
        // If it's a new day, reset the count
        if (lastResetDate < today) {
          await client.query(
            'UPDATE user_prompts SET prompt_count = 0, last_reset_date = $2 WHERE user_id = $1',
            [userId, today]
          );
          promptCount = 0;
        } else {
          promptCount = row.prompt_count;
        }
      } else {
        // Create new record for user
        await client.query(
          'INSERT INTO user_prompts (user_id, prompt_count, last_reset_date) VALUES ($1, 0, $2)',
          [userId, today]
        );
      }

      const response = {
        canUsePrompt: promptCount < DAILY_PROMPT_LIMIT,
        remainingPrompts: DAILY_PROMPT_LIMIT - promptCount,
        totalUsed: promptCount
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
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Database error',
        details: error.message
      }),
    };
  }
}; 