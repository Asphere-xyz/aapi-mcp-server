import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "./server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const app = express();
  const port = process.env.PORT || 3001;
  const sessionTransport: Map<string, SSEServerTransport> = new Map();

  // Serve static HTML at root
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/gateway.html"));
  });

  app.get("/:apiKey/sse", async (req, res) => {
    const apiKey = req.params.apiKey;
    if (!apiKey) {
      throw new Error("apiKey path parameter is required");
    }

    console.debug("Received SSE request:", {
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      apiKey: apiKey.slice(0, 4) + "***",
    });

    const server = createServer(apiKey);
    const transport = new SSEServerTransport("/messages", res);

    sessionTransport.set(transport.sessionId, transport);
    server.server.onclose = async () => {
      await server.close();
      sessionTransport.delete(transport.sessionId);
    };

    await server.server.connect(transport);
  });

  app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId as string;
    if (!sessionId) {
      throw new Error("sessionId query parameter is required");
    }

    console.debug("Received POST request:", {
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      sessionId: sessionId,
    });

    const transport = sessionTransport.get(sessionId);
    if (!transport) {
      throw new Error("Session not found");
    }
    // Note: to support multiple simultaneous connections, these messages will
    // need to be routed to a specific matching transport. (This logic isn't
    // implemented here, for simplicity.)
    await transport.handlePostMessage(req, res);
  });

  app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`);
  });
}

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down...");
  process.exit(0);
});

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
