import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkPromptLimit, incrementPromptUsage } from './api';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('checkPromptLimit', () => {
    it('returns prompt limit data when API call is successful', async () => {
      // Mock successful response
      const mockResponse = {
        canUsePrompt: true,
        remainingPrompts: 3,
        totalUsed: 0,
      };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => mockResponse,
        text: async () => JSON.stringify(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' })
      });

      const result = await checkPromptLimit('test_user_id');
      
      // Check fetch was called correctly
      expect(mockFetch).toHaveBeenCalledWith('/api/check-prompt-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'test_user_id' }),
      });
      
      // Check result matches mock data
      expect(result).toEqual(mockResponse);
    });

    it('handles API errors gracefully', async () => {
      // Mock error response
      const errorData = { error: 'Failed to check prompt limit', details: 'Database error' };
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => errorData,
        text: async () => JSON.stringify(errorData),
        headers: new Headers({ 'content-type': 'application/json' })
      });

      // API should return fallback values on error
      const result = await checkPromptLimit('test_user_id');
      
      // Expect default values to be returned
      expect(result).toEqual({
        canUsePrompt: true,
        remainingPrompts: 3,
        totalUsed: 0,
      });
    });

    it('handles non-JSON responses', async () => {
      // Mock non-JSON response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Internal Server Error',
        json: async () => { throw new Error('Invalid JSON'); },
        headers: new Headers({ 'content-type': 'text/plain' })
      });

      // API should return fallback values for non-JSON responses
      const result = await checkPromptLimit('test_user_id');
      
      // Expect default values to be returned
      expect(result).toEqual({
        canUsePrompt: true,
        remainingPrompts: 3,
        totalUsed: 0,
      });
    });
  });

  describe('incrementPromptUsage', () => {
    it('increments prompt usage when API call is successful', async () => {
      // Mock successful response
      const mockResponse = { success: true };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => mockResponse,
        text: async () => JSON.stringify(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' })
      });

      await incrementPromptUsage('test_user_id');
      
      // Check fetch was called correctly
      expect(mockFetch).toHaveBeenCalledWith('/api/check-prompt-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'test_user_id', action: 'increment' }),
      });
    });

    it('handles API errors gracefully', async () => {
      // Mock error response
      const errorData = { error: 'Failed to increment' };
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => errorData,
        text: async () => JSON.stringify(errorData),
        headers: new Headers({ 'content-type': 'application/json' })
      });

      // Should not throw any errors
      await expect(incrementPromptUsage('test_user_id')).resolves.not.toThrow();
    });
  });
}); 