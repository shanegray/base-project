import { setMockAuth, clearMockAuth } from "../__mocks__/@hono/clerk-auth";

export const mockAuthenticatedUser = (userId = "test_123") => {
  setMockAuth({ userId, sessionId: "test-session-123" });
};

export const mockUnauthenticatedUser = () => {
  setMockAuth({ userId: null, sessionId: null });
};

export const resetAuth = () => {
  clearMockAuth();
};
