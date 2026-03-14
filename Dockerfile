FROM node:22-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk add --no-cache git

WORKDIR RamiOS
COPY . .

RUN npm install
RUN npm run build

CMD npm run serve
