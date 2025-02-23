import { AnkrProvider } from "@ankr.com/ankr.js";

const ANKR_API_KEY = process.env.ANKR_API_KEY;
if (!ANKR_API_KEY) {
  console.error("Error: ANKR_API_KEY environment variable is required");
  process.exit(1);
}

export const provider = new AnkrProvider(ANKR_API_KEY);

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
