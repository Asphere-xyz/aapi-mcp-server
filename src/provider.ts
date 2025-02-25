import { AnkrProvider } from "@ankr.com/ankr.js";

export const blockchains = [
  "arbitrum",
  "avalanche",
  "base",
  "bsc",
  "eth",
  "fantom",
  "flare",
  "gnosis",
  "linea",
  "optimism",
  "polygon",
  "polygon_zkevm",
  "rollux",
  "scroll",
  "syscoin",
  "telos",
  "xai",
  "xlayer",

  // Testnets
  "avalanche_fuji",
  "base_sepolia",
  "eth_holesky",
  "eth_sepolia",
  "optimism_testnet",
  "polygon_amoy",
] as const;

export const buildProvider = (apiKey: string) => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  return new AnkrProvider(`https://rpc.ankr.com/multichain/${apiKey}`);
};
