FROM node:10.16.3 as builder
WORKDIR /
COPY / /
RUN npm install -p
RUN npm run build
RUN npm install pm2@latest -g

EXPOSE 3000
CMD node build/server/index.js