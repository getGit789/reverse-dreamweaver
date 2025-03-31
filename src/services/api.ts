interface PromptLimitResponse {
  canUsePrompt: boolean;
  remainingPrompts: number;
  totalUsed: number;
}

export async function checkPromptLimit(userId: string): Promise<PromptLimitResponse> {
  try {
    console.log('Checking prompt limit for user:', userId);
    const response = await fetch('/api/check-prompt-limit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        // Return fallback data
        return {
          canUsePrompt: true, // Allow usage to prevent blocking the user unnecessarily
          remainingPrompts: 3,
          totalUsed: 0
        };
      }
    } else {
      const textData = await response.text();
      console.error('Received non-JSON response:', textData);
      // Return fallback data
      return {
        canUsePrompt: true, // Allow usage to prevent blocking the user unnecessarily
        remainingPrompts: 3,
        totalUsed: 0
      };
    }
    
    console.log('Prompt limit response:', data);

    if (!response.ok) {
      throw new Error(data.details || data.error || 'Failed to check prompt limit');
    }

    return data;
  } catch (error) {
    console.error('Error checking prompt limit:', error);
    // Return fallback data instead of throwing
    return {
      canUsePrompt: true, // Allow usage to prevent blocking the user unnecessarily
      remainingPrompts: 3,
      totalUsed: 0
    };
  }
}

export async function incrementPromptUsage(userId: string): Promise<void> {
  try {
    console.log('Incrementing prompt usage for user:', userId);
    const response = await fetch('/api/check-prompt-limit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, action: 'increment' }),
    });

    if (!response.ok) {
      throw new Error('Failed to increment prompt usage');
    }

    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new Error('Failed to parse increment response');
      }
    } else {
      const textData = await response.text();
      console.error('Received non-JSON response:', textData);
      throw new Error('Invalid response format');
    }
    
    console.log('Increment response:', data);

    if (!data.success) {
      throw new Error('Failed to increment prompt usage');
    }
  } catch (error) {
    console.error('Error incrementing prompt usage:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function saveFeedback(userId: string, feedback: string): Promise<void> {
  try {
    console.log('Saving feedback for user:', userId);
    const response = await fetch('/api/save-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, feedback }),
    });

    if (!response.ok) {
      throw new Error('Failed to save feedback');
    }

    const data = await response.json();
    console.log('Feedback saved:', data);
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
} 