import { GetAccountBalanceReply } from "@ankr.com/ankr.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { blockchains, provider } from "../provider.js";

function formatBalanceReply(reply: GetAccountBalanceReply): string {
  return `Total Balance: $${reply.totalBalanceUsd}

Assets:
${reply.assets
  .map(
    (asset) =>
      `• ${asset.blockchain}: ${asset.balance} ${asset.tokenSymbol} ($${
        asset.balanceUsd
      })
    Token: ${asset.tokenName}${
        asset.contractAddress
          ? `\n    Contract: ${asset.contractAddress}`
          : " (Native)"
      }`
  )
  .join("\n\n")}`;
}

export function registerGetAccountBalance(server: McpServer) {
  server.tool(
    "getAccountBalance",
    {
      address: z
        .string()
        .refine(
          (addr) =>
            (addr.startsWith("0x") && addr.length === 42) ||
            addr.endsWith(".eth"),
          "Must be a valid Ethereum address (0x...) or ENS name (*.eth, for example, 'vitalik.eth')"
        ),
      blockchains: z
        .array(z.enum(blockchains))
        .optional()
        .describe(
          `The blockchains to get the balance for.
If not provided, the balance will be fetched for all blockchains.
Specify only if you want to get the balance for a specific blockchain.`
        ),
    },
    async ({ address, blockchains }) => {
      const balances = await provider.getAccountBalance({
        blockchain: blockchains,
        walletAddress: address,
      });
      return {
        content: [{ type: "text", text: formatBalanceReply(balances) }],
      };
    }
  );
}
