import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeThought } from './ai';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('AI Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('analyzeThought', () => {
    it('returns thought analysis when API call is successful', async () => {
      // Mock successful response
      const mockResponse = {
        reversal: 'Reversed thought example',
        explanation: 'Explanation of the thought reversal',
        pattern: 'All-or-nothing thinking'
      };
      
      // Need to create a proper response object
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => mockResponse,
        text: async () => JSON.stringify(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' })
      });

      const result = await analyzeThought('My original thought');
      
      // Check fetch was called correctly
      expect(mockFetch).toHaveBeenCalledWith('/api/analyze-thought', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thought: 'My original thought' }),
      });
      
      // Check result matches mock data
      expect(result).toEqual(mockResponse);
    });

    it('throws error when API request fails', async () => {
      // Mock error response
      const errorData = { error: { message: 'API error occurred' } };
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => errorData,
        text: async () => JSON.stringify(errorData),
        headers: new Headers({ 'content-type': 'application/json' })
      });

      // API should throw an error
      await expect(analyzeThought('My original thought')).rejects.toThrow('API error occurred');
    });

    it('throws error when response format is invalid', async () => {
      // Mock invalid response
      const invalidData = { someOtherProperty: 'Invalid data' };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => invalidData,
        text: async () => JSON.stringify(invalidData),
        headers: new Headers({ 'content-type': 'application/json' })
      });

      // API should throw an error about invalid format
      await expect(analyzeThought('My original thought')).rejects.toThrow('Invalid response format from AI');
    });

    it('handles network errors gracefully', async () => {
      // Mock network error
      mockFetch.mockRejectedValueOnce(new Error('Network failure'));

      // API should throw a meaningful error
      await expect(analyzeThought('My original thought')).rejects.toThrow('Network failure');
    });
  });
}); 