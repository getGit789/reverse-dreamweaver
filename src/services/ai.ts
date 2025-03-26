export interface ThoughtAnalysis {
  pattern?: string;
  reversal: string;
  explanation: string;
}

export async function analyzeThought(thought: string): Promise<ThoughtAnalysis> {
  try {
    console.log('Making API request...');
    const response = await fetch('/api/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData.error?.message || 'Failed to analyze thought');
    }

    const data = await response.json();
    console.log('API Response Data:', data);
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from API');
    }

    try {
      const content = data.choices[0].message.content;
      console.log('Parsing content:', content);
      const result = JSON.parse(content);
      
      if (!result.pattern || !result.reversal || !result.explanation) {
        console.error('Missing required fields in result:', result);
        throw new Error('Invalid response format from AI');
      }

      return {
        reversal: result.reversal,
        explanation: result.explanation
      } as ThoughtAnalysis;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error analyzing thought:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze thought. Please try again later.');
  }
} 