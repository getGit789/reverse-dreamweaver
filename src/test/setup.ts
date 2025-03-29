import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock the Clerk authentication provider
vi.mock('@clerk/clerk-react', () => {
  const ReactModule = require('react');
  return {
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'test_user_id',
        fullName: 'Test User',
        imageUrl: 'https://example.com/avatar.png',
      },
    }),
    SignedIn: ({ children }) => ReactModule.createElement(ReactModule.Fragment, null, children),
    SignedOut: () => null,
    useClerk: () => ({
      openUserProfile: vi.fn(),
    }),
    UserButton: () => ReactModule.createElement('div', { 'data-testid': 'user-button' }, 'User Button'),
    SignInButton: ({ children }) => ReactModule.createElement(ReactModule.Fragment, null, children),
  };
});

// Mock fetch API
const originalFetch = global.fetch;
beforeAll(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => {
  global.fetch = originalFetch;
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
