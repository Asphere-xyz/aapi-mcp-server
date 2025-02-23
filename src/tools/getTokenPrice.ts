import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { provider, blockchains } from "../provider.js";

export function registerGetTokenPrice(server: McpServer) {
  server.tool(
    "getTokenPrice",
    `Get the price of a token on a specific blockchain. Provide contract address for ERC20 tokens or leave empty for native coin.
For example:
- get price for 0x1234567890123456789012345678901234567890 on eth
    - blockchain: eth
    - contract address: 0x1234567890123456789012345678901234567890
- get price for eth
    - blockchain: eth
    - contract address: (empty)

Blockchains supported:
- ${blockchains.join("\n- ")}`,
    {
      blockchain: z.enum(blockchains),
      contractAddress: z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/)
        .optional()
        .describe(
          "Contract address of the token. Leave empty for native coin."
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
