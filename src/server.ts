import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetAccountBalance } from "./tools/getAccountBalance.js";
import { registerGetTokenPrice } from "./tools/getTokenPrice.js";

export const createServer = () => {
  const server = new McpServer({
    name: "AAPI MCP Server",
    version: "0.1.0",
  });

  // Register tools
  registerGetAccountBalance(server);
  registerGetTokenPrice(server);
  return { server };
};
