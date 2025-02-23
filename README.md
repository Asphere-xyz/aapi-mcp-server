# Ankr Advanced API MCP Server ⚡

This is a Model Context Protocol ([MCP](https://modelcontextprotocol.io/)) server that provides tools for interacting with Ankr's Advanced APIs. It enables AI models to fetch blockchain data and perform various operations.

## Tools

- `getAccountBalance`: Fetch token balances across multiple blockchains for any address or ENS name
- `getTokenPrice`: Get current price for any token (native or ERC20) on supported blockchains

## Supported Blockchains

- **Mainnets:** Ethereum, BSC, Polygon, Arbitrum, Avalanche, Base, Fantom, Gnosis, Linea, Optimism, and more
- **Testnets:** Ethereum Sepolia, Ethereum Holesky, Base Sepolia, Avalanche Fuji, and others

## Prerequisites

1. [Ankr API Key](http://ankr.com/rpc/)
   - Create a free account at [ankr.com/rpc](http://ankr.com/rpc/)

## Local development

Install dependencies

```sh
pnpm i
```

Build

```sh
pnpm build
```

Run SSE

```sh
pnpm start:sse
```

Add to Cursor `http://localhost:3001/sse`
