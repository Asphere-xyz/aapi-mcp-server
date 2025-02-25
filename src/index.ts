#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

async function main() {
  const apiKey = process.env.ANKR_API_KEY;
  if (!apiKey) {
    console.error("Error: ANKR_API_KEY environment variable is required");
    process.exit(1);
  }

  const server = createServer(apiKey);
  const transport = new StdioServerTransport();

  await server.connect(transport);

  // Cleanup on exit
  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
