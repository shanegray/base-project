import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

vi.mock("@hono/clerk-auth", () => import("./__mocks__/@hono/clerk-auth"));
import { appRequest, getRequest } from "./helpers/connect";
import app from "../src/worker";
import { mockAuthenticatedUser, resetAuth } from "./helpers/auth";
describe("Client CRUD Tests", () => {
  beforeEach(async () => {
    mockAuthenticatedUser();
  });

  afterEach(() => {
    resetAuth();
  });

  it("First Test", async () => {
    // Arrange =>

    // Act =>
    const res = await getRequest(app, "/api/ping");

    // Assert
    expect(res.status).toBe(200);
  });
});
