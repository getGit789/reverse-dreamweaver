export interface ThoughtAnalysis {
  pattern?: string;
  reversal: string;
  explanation: string;
}

export async function analyzeThought(thought: string): Promise<ThoughtAnalysis> {
  try {
    console.log('Making API request...');
    
    // Use different endpoints for development and production
    const endpoint = import.meta.env.DEV 
      ? '/api/chat/completions'  // Development (Vite proxy)
      : '/api/analyze-thought';  // Production (Netlify function)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thought }),
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
    
    if (!data.reversal || !data.explanation) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from AI');
    }

    return {
      reversal: data.reversal,
      explanation: data.explanation
    } as ThoughtAnalysis;
  } catch (error) {
    console.error('Error analyzing thought:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze thought. Please try again later.');
  }
} 