import { vi } from "vitest";
import type { Context, Next } from "hono";

// Mock state that can be controlled from tests
let mockAuthState = {
  userId: null as string | null,
  sessionId: null as string | null,
};

// Helper to control mock state from tests
export const setMockAuth = (auth: {
  userId?: string | null;
  sessionId?: string | null;
}) => {
  mockAuthState = { ...mockAuthState, ...auth };
};

export const clearMockAuth = () => {
  mockAuthState = { userId: null, sessionId: null };
};

// Mock implementations
export const clerkMiddleware = vi.fn(() => {
  return vi.fn(async (c: Context, next: Next) => {
    // Simulate middleware behavior - just call next
    return next();
  });
});

export const getAuth = vi.fn((c: Context) => {
  return {
    userId: mockAuthState.userId,
    sessionId: mockAuthState.sessionId,
  };
});
