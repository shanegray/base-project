import { createAuthRouter } from "../utils";

const app = createAuthRouter()
  // GET /clients - List all clients
  .get("/", async (c) => {
    return c.json({ message: "Ok" });
  });

export default app;
