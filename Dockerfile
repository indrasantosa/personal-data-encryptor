FROM node:10.16.3 as builder
WORKDIR /app
COPY / .
RUN npm install -p
RUN npm run build


FROM node:10.16.3 as runner
WORKDIR /app
COPY --from=builder /app/build .
COPY /config/dotenv/production.env ./.env
EXPOSE 3000
CMD node server/index.js