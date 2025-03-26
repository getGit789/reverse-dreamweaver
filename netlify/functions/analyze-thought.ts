import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { thought } = JSON.parse(event.body || '{}');

    if (!thought) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Thought is required' }),
      };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert in cognitive behavioral therapy, known for delivering powerful, concise perspective shifts. Respond in JSON format with brief, impactful insights.

Guidelines for responses:
1. Pattern Recognition (Internal):
- Quickly identify core limiting beliefs
- Note key cognitive distortions
- Consider emotional impact

2. Alternative Perspective (User-Facing):
- Deliver a single, powerful reframe (15-20 words max)
- Use metaphors or clear imagery when possible
- Focus on transformation, not criticism
- Make it quotable and memorable

3. Brief Explanation (User-Facing):
- One clear, practical benefit (20-25 words max)
- Connect to real-life impact
- Keep it actionable

Respond with a JSON object using this structure:
{
  "pattern": "(Internal) Core limiting belief identified",
  "reversal": "Powerful 15-20 word perspective shift using metaphor or clear imagery",
  "explanation": "Single, practical benefit in 20-25 words"
}`
        },
        {
          role: "user",
          content: `Transform this thought with a powerful, concise perspective: "${thought}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 250,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.2,
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(response.choices[0].message?.content || '{}');
    
    // Transform response to match expected format if needed
    const transformedResponse = {
      pattern: aiResponse.pattern || aiResponse.Pattern_Recognition,
      reversal: aiResponse.reversal || aiResponse.Alternative_Perspective,
      explanation: aiResponse.explanation || aiResponse.Brief_Explanation
    };

    // Validate the response has required fields
    if (!transformedResponse.reversal || !transformedResponse.explanation) {
      throw new Error('Invalid response format from AI');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedResponse),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to analyze thought' }),
    };
  }
}; 