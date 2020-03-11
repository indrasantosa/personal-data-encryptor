const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const { NODE_ENV = 'production' } = process.env;

const plugins = [];
if (NODE_ENV === 'development') {
  plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: ['yarn server:run:dev']
    })
  );
}

module.exports = {
  entry: './src/server/index.ts',
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../../build/server'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: '/**/*.test.ts',
        use: {
          loader: 'ts-loader',
          options: {
            context: path.resolve(__dirname, '../..'),
            configFile: path.resolve(
              __dirname,
              '../tsconfig/tsconfig.server.json'
            )
          }
        }
      }
    ]
  }
};
