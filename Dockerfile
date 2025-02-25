FROM node:23-slim as base

RUN npm install -g pnpm@10.5.0

WORKDIR /app

# Add package file
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install deps
RUN pnpm install

# Copy source
COPY tsconfig.json ./tsconfig.json
COPY src ./src

# Build dist
RUN pnpm build
RUN pnpm prune --prod

# Start production image build
FROM node:23-slim

WORKDIR /app

# Copy node modules and build directory
COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/dist /app/dist

# Expose port 3001
EXPOSE 3001
CMD ["/app/dist/managed/sse.js"]
