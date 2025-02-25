import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildProvider } from "./provider.js";
import { registerGetAccountBalance } from "./tools/getAccountBalance.js";
import { registerGetTokenPrice } from "./tools/getTokenPrice.js";

export const createServer = (apiKey: string) => {
  const server = new McpServer({
    name: "AAPI MCP Server",
    version: "0.1.0",
  });

  const provider = buildProvider(apiKey);

  // Register tools
  registerGetAccountBalance({ server, provider });
  registerGetTokenPrice({ server, provider });

  return { server };
};
