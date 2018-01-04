/* eslint-disable global-require */
/* eslint-disable import/first */
import './run/global';
import { match } from 'rfx-core';
import merge from 'webpack-merge';
import Globals from './webpack/globals';
import getLoaders from './webpack/loaders';

let Config;
let Loader = getLoaders();

if (match.script('web:client', 'development')) {
  Config = require('./webpack/config.client').load();
  const ConfigClientDev = require('./webpack/config.client.dev');
  Loader = merge(Loader, ConfigClientDev.loader());
  Config = merge(Config, ConfigClientDev.config('web'));
}

if (match.script('web:server', 'development')) {
  Config = require('./webpack/config.server').load();
  const ConfigServerDev = require('./webpack/config.server.dev');
  Loader = merge(Loader, ConfigServerDev.loader());
  Config = merge(Config, ConfigServerDev.config('start.web'));
}

if (match.script('build:client:web', 'production')) {
  Config = require('./webpack/config.client').load();
  const ConfigClientBuild = require('./webpack/config.client.build');
  Loader = merge(Loader, ConfigClientBuild.loader());
  Config = merge(Config, ConfigClientBuild.config('web'));
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
      Loader.url,
      Loader.file,
      Loader.cssGlobal,
      Loader.cssModules,
    ],
  },
});

const WebpackConfig = Config;
export default WebpackConfig;
