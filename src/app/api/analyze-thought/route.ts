import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { thought } = await request.json();

    if (!thought) {
      return NextResponse.json(
        { error: 'Thought is required' },
        { status: 400 }
      );
    }

    const prompt = `Analyze this thought and provide a transformative perspective:
    "${thought}"
    
    Consider:
    1. Identify any cognitive distortions or limiting beliefs
    2. Provide an alternative perspective that challenges these patterns
    3. Explain why this new perspective might be helpful
    
    Respond in JSON format with pattern, reversal, and explanation.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert in cognitive behavioral therapy and perspective transformation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      });

      // Check for valid content
      if (!response.choices || 
          response.choices.length === 0 || 
          !response.choices[0].message || 
          !response.choices[0].message.content) {
        console.error('OpenAI API returned an invalid response:', response);
        return NextResponse.json(
          { 
            error: 'Invalid response from AI service',
            fallback: {
              reversal: "I couldn't generate a perspective this time. Please try rephrasing your thought.",
              explanation: "Sometimes the AI has trouble processing certain thoughts. A simpler or more specific thought might work better.",
              pattern: "Technical limitation"
            }
          },
          { status: 200 } // Still return 200 to allow the app to display the fallback
        );
      }

      // Parse and validate JSON
      try {
        const result = JSON.parse(response.choices[0].message.content);
        
        // Validate required fields
        if (!result.reversal || !result.explanation) {
          console.error('OpenAI response missing required fields:', result);
          return NextResponse.json(
            { 
              error: 'Incomplete response from AI service',
              fallback: {
                reversal: "I generated a response but it was missing some elements. Please try again.",
                explanation: "The AI service responded but with incomplete data. This is a temporary issue.",
                pattern: "Technical limitation"
              }
            },
            { status: 200 }
          );
        }
        
        return NextResponse.json(result);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response:', parseError);
        return NextResponse.json(
          { 
            error: 'Failed to parse AI response',
            fallback: {
              reversal: "There was an issue processing the response. Please try again.",
              explanation: "The AI generated a response that couldn't be properly formatted.",
              pattern: "Technical limitation"
            }
          },
          { status: 200 }
        );
      }
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      
      // Handle rate limits and other OpenAI-specific errors
      const errorMessage = openaiError.message || 'Unknown OpenAI error';
      const isRateLimit = errorMessage.includes('rate limit') || 
                          errorMessage.includes('too many requests');
      
      return NextResponse.json(
        { 
          error: errorMessage,
          fallback: {
            reversal: isRateLimit 
              ? "I'm currently a bit overloaded. Please try again in a moment." 
              : "I couldn't analyze your thought right now. Please try again.",
            explanation: isRateLimit 
              ? "Our AI service is experiencing high demand. Your request will likely succeed if you try again shortly." 
              : "There was a temporary issue connecting to our AI service.",
            pattern: "Technical limitation"
          }
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error handling the request:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze thought',
        fallback: {
          reversal: "Something went wrong processing your request.",
          explanation: "There was a technical issue. Please try again with a different thought.",
          pattern: "Technical error"
        }
      },
      { status: 200 } // Return 200 with fallback instead of 500 to keep UI functional
    );
  }
} 