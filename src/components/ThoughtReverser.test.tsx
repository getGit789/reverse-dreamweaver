import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ThoughtReverser from './ThoughtReverser';
import { analyzeThought } from '@/services/ai';
import { checkPromptLimit, incrementPromptUsage } from '@/services/api';

// Mock the modules
vi.mock('@/services/ai', () => ({
  analyzeThought: vi.fn(),
}));

vi.mock('@/services/api', () => ({
  checkPromptLimit: vi.fn(),
  incrementPromptUsage: vi.fn(),
}));

// Mock the user hook
vi.mock('@clerk/clerk-react', () => ({
  useUser: () => ({
    isSignedIn: true,
    user: {
      id: 'test-user-id',
      fullName: 'Test User',
      imageUrl: 'https://example.com/avatar.jpg'
    }
  })
}));

// Mock the UI components
vi.mock('@/components/ui/tooltip', () => {
  const React = require('react');
  return {
    Tooltip: ({ children }) => React.createElement('div', { 'data-testid': 'tooltip' }, children),
    TooltipContent: ({ children }) => React.createElement('div', { 'data-testid': 'tooltip-content' }, children),
    TooltipTrigger: ({ children }) => React.createElement('div', { 'data-testid': 'tooltip-trigger' }, children)
  };
});

vi.mock('@/components/ui/dialog', () => {
  const React = require('react');
  return {
    Dialog: ({ children }) => React.createElement('div', { 'data-testid': 'dialog' }, children),
    DialogContent: ({ children }) => React.createElement('div', { 'data-testid': 'dialog-content' }, children),
    DialogHeader: ({ children }) => React.createElement('div', { 'data-testid': 'dialog-header' }, children),
    DialogTitle: ({ children }) => React.createElement('div', { 'data-testid': 'dialog-title' }, children),
    DialogDescription: ({ children }) => React.createElement('div', { 'data-testid': 'dialog-description' }, children),
    DialogFooter: ({ children }) => React.createElement('div', { 'data-testid': 'dialog-footer' }, children),
  };
});

// Mock the sonner toast
vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

describe('ThoughtReverser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Set up default mock implementations
    vi.mocked(checkPromptLimit).mockResolvedValue({
      canUsePrompt: true,
      remainingPrompts: 3,
      totalUsed: 0
    });
    
    vi.mocked(analyzeThought).mockResolvedValue({
      reversal: 'This is the reversed thought',
      explanation: 'This is the explanation of the reversal',
      pattern: 'All-or-nothing thinking'
    });
    
    vi.mocked(incrementPromptUsage).mockResolvedValue();
  });
  
  it('renders the component correctly', () => {
    render(<ThoughtReverser />);
    
    expect(screen.getByText('Enter your thought:')).toBeInTheDocument();
    expect(screen.getByText('Transform Perspective')).toBeInTheDocument();
  });
  
  it('shows analysis results after submitting thought', async () => {
    render(<ThoughtReverser />);
    
    // Input a thought
    const textarea = screen.getByPlaceholderText('Enter a thought, belief, or perspective you\'d like to transform...');
    fireEvent.change(textarea, { target: { value: 'This is my test thought' } });
    
    // Click the analyze button
    const button = screen.getByText('Transform Perspective');
    fireEvent.click(button);
    
    // Check that the API was called correctly
    expect(analyzeThought).toHaveBeenCalledWith('This is my test thought');
    expect(checkPromptLimit).toHaveBeenCalledWith('test-user-id');
    
    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('Alternative Perspective')).toBeInTheDocument();
      expect(screen.getByText('This is the reversed thought')).toBeInTheDocument();
      expect(screen.getByText('Why This Helps')).toBeInTheDocument();
      expect(screen.getByText('This is the explanation of the reversal')).toBeInTheDocument();
      expect(screen.getByText('Pattern Identified')).toBeInTheDocument();
      expect(screen.getByText('All-or-nothing thinking')).toBeInTheDocument();
    });
    
    // Check that prompt usage was incremented
    expect(incrementPromptUsage).toHaveBeenCalledWith('test-user-id');
  });
  
  it('disables the button when prompt limit is reached', async () => {
    // Mock prompt limit reached
    vi.mocked(checkPromptLimit).mockResolvedValue({
      canUsePrompt: false,
      remainingPrompts: 0,
      totalUsed: 3
    });
    
    render(<ThoughtReverser />);
    
    // Wait for prompt limit check to complete
    await waitFor(() => {
      expect(screen.getByText('Transform Perspective')).toBeDisabled();
    });
    
    // Input a thought
    const textarea = screen.getByPlaceholderText('Enter a thought, belief, or perspective you\'d like to transform...');
    fireEvent.change(textarea, { target: { value: 'This is my test thought' } });
    
    // Button should remain disabled
    expect(screen.getByText('Transform Perspective')).toBeDisabled();
  });
  
  it('shows error message when analysis fails', async () => {
    // Mock analysis failure
    vi.mocked(analyzeThought).mockRejectedValue(new Error('Analysis failed'));
    
    render(<ThoughtReverser />);
    
    // Input a thought
    const textarea = screen.getByPlaceholderText('Enter a thought, belief, or perspective you\'d like to transform...');
    fireEvent.change(textarea, { target: { value: 'This is my test thought' } });
    
    // Click the analyze button
    const button = screen.getByText('Transform Perspective');
    fireEvent.click(button);
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Analysis failed')).toBeInTheDocument();
    });
  });
  
  it('shows loading state while analyzing', async () => {
    // Use a delayed resolution to test loading state
    vi.mocked(analyzeThought).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            reversal: 'This is the reversed thought',
            explanation: 'This is the explanation',
            pattern: 'Pattern'
          });
        }, 100);
      });
    });
    
    render(<ThoughtReverser />);
    
    // Input a thought
    const textarea = screen.getByPlaceholderText('Enter a thought, belief, or perspective you\'d like to transform...');
    fireEvent.change(textarea, { target: { value: 'This is my test thought' } });
    
    // Click the analyze button
    const button = screen.getByText('Transform Perspective');
    fireEvent.click(button);
    
    // Check for loading state
    expect(screen.getByText('Analyzing...')).toBeInTheDocument();
    
    // Wait for results
    await waitFor(() => {
      expect(screen.getByText('This is the reversed thought')).toBeInTheDocument();
    });
  });
}); 