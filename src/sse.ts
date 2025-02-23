import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { createServer } from "./server.js";

async function main() {
  const PORT = process.env.PORT || 3001;

  const server = createServer();
  const app = express();

  let transport: SSEServerTransport;

  app.get("/sse", async (req, res) => {
    transport = new SSEServerTransport("/messages", res);
    await server.server.connect(transport);
  });

  app.post("/messages", async (req, res) => {
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
