/* eslint global-require: 0 */
/* eslint import/newline-after-import: 0 */
import merge from 'webpack-merge';
import match from './src/utils/match';
import Globals from './webpack/globals';
import { getLoaders, getPreLoaders } from './webpack/loaders';
import './run/init';

let Config;
let Loader = getLoaders();
const PreLoader = getPreLoaders();

if (match.script('web:dev', 'development')) {
  Config = require('./webpack/config.client').load();
  const ConfigClientDev = require('./webpack/config.client.dev');
  Loader = merge(Loader, ConfigClientDev.loader());
  Config = merge(Config, ConfigClientDev.config());
}

if (match.script('build:client:web', 'production')) {
  Config = require('./webpack/config.client').load();
  const ConfigClientBuild = require('./webpack/config.client.build');
  Loader = merge(Loader, ConfigClientBuild.loader());
  Config = merge(Config, ConfigClientBuild.config());
}

if (match.script('build:server:web', 'production')) {
  Config = require('./webpack/config.server').load('start.web');
  const ConfigServerBuild = require('./webpack/config.server.build');
  Loader = merge(Loader, ConfigServerBuild.loader());
  Config = merge(Config, ConfigServerBuild.config());
}

if (match.script('build:server:api', 'production')) {
  Config = require('./webpack/config.server').load('start.api');
  const ConfigServerBuild = require('./webpack/config.server.build');
  Loader = merge(Loader, ConfigServerBuild.loader());
  Config = merge(Config, ConfigServerBuild.config());
}

// Globals
Config = merge(Config, Globals);

// Loaders
Config = merge(Config, {
  module: {
    preLoaders: [PreLoader.eslint],
    loaders: [
      Loader.jsx,
      Loader.json,
      Loader.url,
      Loader.file,
      Loader.cssGlobal,
      Loader.cssModules,
    ],
  },
});

const WebpackConfig = Config;
export default WebpackConfig;
