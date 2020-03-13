# Secure Personal DB

It is an app to store your personal information. Data will be encrypted in the database.
Front end app use React, Redux, backend Koa, and postgres database on the back. This app mostly written in typescript to
ensure type checking and provide better intellisense in the editor.

For deployment this project use docker compose.

## Setting up the project

Project need `.env` file to be present on the root directory. Run command `npm run env:development` to copy sample `.env` to the root.
Change the parameter accordingly.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Run the app with development mode

### `yarn build`

Build for production mode

### `yarn test`

Test critical part of the app (currently not all part of the app is created)

### `docker-compose up -d`

Run the application on docker container. this script will also spin up required db
