export interface ThoughtAnalysis {
  pattern?: string;
  reversal: string;
  explanation: string;
}

export async function analyzeThought(thought: string): Promise<ThoughtAnalysis> {
  try {
    console.log('Making API request...');
    
    // Use Netlify function endpoint in both environments
    const response = await fetch('/api/analyze-thought', {
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
      
      // Check if there's a fallback response available
      if (errorData.fallback) {
        console.log('Using fallback response:', errorData.fallback);
        return errorData.fallback;
      }
      
      throw new Error(errorData.error?.message || 'Failed to analyze thought');
    }

    const data = await response.json();
    console.log('API Response Data:', data);
    
    // If the API returned an error but with a fallback, use the fallback
    if (data.error && data.fallback) {
      console.log('API returned error with fallback:', data);
      return data.fallback;
    }
    
    if (!data.reversal || !data.explanation) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from AI');
    }

    return {
      reversal: data.reversal,
      explanation: data.explanation,
      pattern: data.pattern
    } as ThoughtAnalysis;
  } catch (error) {
    console.error('Error analyzing thought:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze thought. Please try again later.');
  }
} 