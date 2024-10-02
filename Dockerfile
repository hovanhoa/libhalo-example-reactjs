FROM node:20-alpine3.18

RUN apk update && \
    apk add --no-cache libc6-compat && \
    apk add git python3

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
