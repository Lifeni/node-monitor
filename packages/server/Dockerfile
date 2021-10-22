FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN npm i pnpm -g
RUN pnpm i

COPY . .

RUN pnpx prisma generate
RUN pnpm run build

FROM node:16-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist/bundle/server.js ./

CMD [ "npm", "run deploy" ]
