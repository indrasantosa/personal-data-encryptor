FROM node:10.16.3
WORKDIR /app
COPY / .
RUN npm install -p
RUN npm run build
EXPOSE 3000
CMD ./node_modules/.bin/ts-node ./node_modules/typeorm/cli.js schema:sync && node build/server/index.js