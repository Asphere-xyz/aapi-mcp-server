import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { provider, blockchains } from "../provider.js";

export function registerGetTokenPrice(server: McpServer) {
  server.tool(
    "getTokenPrice",
    {
      blockchain: z.enum(blockchains),
      contractAddress: z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/)
        .optional()
        .describe(
          "Contract address of the token. Leave empty for native token."
        ),
    },
    async ({ blockchain, contractAddress = "" }) => {
      console.debug(
        `getTokenPrice, blockchain: ${blockchain}, contractAddress: ${contractAddress}`
      );
      const price = await provider.getTokenPrice({
        blockchain,
        contractAddress,
      });
      return {
        content: [
          {
            type: "text",
            text: `Current price: $${price.usdPrice}`,
          },
        ],
      };
    }
  );
}
