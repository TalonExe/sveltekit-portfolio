FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
# Intentionally NOT copying package-lock.json — it's Windows-generated
# and missing Linux/musl native binaries for Rollup
RUN npm install

COPY . .
RUN npm run build

RUN npm prune --production

FROM node:22-alpine AS runner

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder --chown=appuser:appgroup /app/build ./build
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package.json ./package.json

USER appuser

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

CMD ["node", "build"]