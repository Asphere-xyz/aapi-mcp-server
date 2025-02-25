import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { createServer } from "./server.js";

async function main() {
  const PORT = process.env.PORT || 3001;
  const apiKey = process.env.ANKR_API_KEY;
  if (!apiKey) {
    console.error("Error: ANKR_API_KEY environment variable is required");
    process.exit(1);
  }

  const server = createServer(apiKey);
  const app = express();

  let transport: SSEServerTransport;

  app.get("/sse", async (req, res) => {
    console.log("Received SSE request:", {
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });
    transport = new SSEServerTransport("/messages", res);
    await server.server.connect(transport);
  });

  app.post("/messages", async (req, res) => {
    console.log("Received POST request:", {
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });
    // Note: to support multiple simultaneous connections, these messages will
    // need to be routed to a specific matching transport. (This logic isn't
    // implemented here, for simplicity.)
    await transport.handlePostMessage(req, res);
  });

  console.log(`⚡ sse server is running on port ${PORT}`);
  app.listen(PORT);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
