'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx'
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// TODO: Add more app path to here
// - server config
// - server and client tsconfigs
// - env folders
// - public folders?
// - client and build folders etc.

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/client/index'),
  appIndexServerJs: resolveModule(resolveApp, 'src/server/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),

  // TS config
  clientTsConfig: resolveApp('config/tsconfig/tsconfig.client.json'),
  serverTsConfig: resolveApp('config/tsconfig/tsconfig.server.json'),

  // Webpack config
  clientWebpackConfig: resolveApp('config/webpack/webpack.client.js'),
  serverWebpackConfig: resolveApp('config/webpack/webpack.server.js'),

  // Output
  clientOutputPath: resolveApp('build/client'),
  serverOutputPath: resolveApp('build/server'),

  appTsConfig: resolveApp('config/tsconfig/tsconfig.client.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath
};

module.exports.moduleFileExtensions = moduleFileExtensions;
