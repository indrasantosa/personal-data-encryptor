import dotenv from 'dotenv';
import Koa from 'koa';
import path from 'path';
import serveStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import koaBody from 'koa-body';

import createApplicationRouter from './routes';
import spaPlugins from './middlewares/spaPlugins';

import { createConnection } from 'typeorm';

dotenv.config();

console.log(`Using data ${process.env.DATA}`);
const isProdBuild = process.env.PROD_BUILD === 'true';

const createApp = async () => {
  const app = new Koa();

  // Add application middlewares
  app.use(spaPlugins);
  app.use(koaBody({ multipart: true }));
  // app.use(bodyParser());

  // Add application routes
  app.use(createApplicationRouter().routes());

  if (!isProdBuild) {
    const koaWebpackModule = await import('./middlewares/koaWebpack');
    const { default: koaWebpack } = koaWebpackModule;
    const koaWebpackMiddleware = await koaWebpack();
    app.use(koaWebpackMiddleware);
  }

  if (isProdBuild) {
    const staticPath = path.resolve('build/client');
    console.log('Serving from: ' + staticPath);
    app.use(serveStatic(staticPath));
  }
  // app.use(IndexController.HomePage);
  // createConnection()
  //   .then(async connection => {
  //     console.log('Inserting a new user into the database...');
  //     const user = new User();
  //     user.firstName = 'Timber';
  //     user.lastName = 'Saw';
  //     user.age = 25;
  //     await connection.manager.save(user);
  //     console.log('Saved a new user with id: ' + user.id);

  //     console.log('Loading users from the database...');
  //     const users = await connection.manager.find(User);
  //     console.log('Loaded users: ', users);

  //     console.log(
  //       'Here you can setup and run express/koa/any other framework.'
  //     );
  //   })
  //   .catch(error => console.log(error));

  return app;
};

export default createApp;
