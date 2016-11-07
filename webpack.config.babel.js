/* eslint global-require: 0 */
/* eslint import/first: 0 */
/* eslint import/newline-after-import: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
import './run/global';
import merge from 'webpack-merge';
import match from './src/utils/match';
import Globals from './webpack/globals';
import getLoaders from './webpack/loaders';

let Config;
let Loader = getLoaders();

if (match.script('web:dev', 'development')) {
  Config = require('./webpack/config.server').load();
  const ConfigServerDev = require('./webpack/config.server.dev');
  Loader = merge(Loader, ConfigServerDev.loader());
  Config = merge(Config, ConfigServerDev.config('start.web'));
}

if (match.script('build:client:web', 'production')) {
  Config = require('./webpack/config.client').load();
  const ConfigClientBuild = require('./webpack/config.client.build');
  Loader = merge(Loader, ConfigClientBuild.loader());
  Config = merge(Config, ConfigClientBuild.config());
}

if (match.script('build:server:web', 'production')) {
  Config = require('./webpack/config.server').load();
  const ConfigServerBuild = require('./webpack/config.server.build');
  Loader = merge(Loader, ConfigServerBuild.loader());
  Config = merge(Config, ConfigServerBuild.config('start.web'));
}

if (match.script('build:server:api', 'production')) {
  Config = require('./webpack/config.server').load();
  const ConfigServerBuild = require('./webpack/config.server.build');
  Loader = merge(Loader, ConfigServerBuild.loader());
  Config = merge(Config, ConfigServerBuild.config('start.api'));
}

// Globals
Config = merge(Config, Globals);

// Loaders
Config = merge(Config, {
  module: {
    loaders: [
      Loader.eslint,
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
