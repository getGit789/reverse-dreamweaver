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

    const result = JSON.parse(response.choices[0].message.content);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze thought' },
      { status: 500 }
    );
  }
} 