import { AnkrProvider } from "@ankr.com/ankr.js";

const ANKR_AAPI_ENDPOINT = process.env.ANKR_AAPI_ENDPOINT;
if (!ANKR_AAPI_ENDPOINT) {
  console.error("Error: ANKR_AAPI_ENDPOINT environment variable is required");
  process.exit(1);
}

// Example: https://rpc.ankr.com/multichain/YOUR-TOKEN
export const provider = new AnkrProvider(ANKR_AAPI_ENDPOINT);

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
