import koaWebpack from 'koa-webpack';
import webpack, { Configuration } from 'webpack';

import frontEndConfig from '../../../config/webpack/webpack.client.config';

const createWebpack = async () => {
  const compiler = webpack(
    frontEndConfig(process.env.NODE_ENV) as Configuration
  );
  return await koaWebpack({ compiler });
};

export default createWebpack;
