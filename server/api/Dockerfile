FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm generate


RUN pnpm build

ENV NODE_ENV=production

EXPOSE 3000


CMD ["pnpm", "prod"]