FROM node:10.4.0-alpine

WORKDIR /opt/lib
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm test:prod
RUN npm run build
