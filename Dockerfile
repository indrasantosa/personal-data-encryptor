FROM node:10.16.3
WORKDIR /app
COPY / .
RUN npm install -p
RUN npm run build
EXPOSE 3000
CMD bash scripts/run.sh