import dotenv from 'dotenv';
import Koa from 'koa';
import path from 'path';
import serveStatic from 'koa-static';
import koaBody from 'koa-body';

import createApplicationRouter from './routes';
import spaPlugins from './middlewares/spaPlugins';
import errHandler from './middlewares/errHandler';

dotenv.config();

console.log(`Using data ${process.env.DATA}`);
const isProdBuild = process.env.PROD_BUILD === 'true';

const createApp = async () => {
  const app = new Koa();

  // Add application middlewares
  app.use(errHandler);
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

  return app;
};

export default createApp;
