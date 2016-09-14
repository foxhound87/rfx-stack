/* eslint global-require: 0 */
/* eslint import/imports-first: 0 */
/* eslint import/newline-after-import: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
import './run/init';
import merge from 'webpack-merge';
import Globals from './webpack/globals';
import { getLoaders, getPreLoaders } from './webpack/loaders';

let Config;
let Loader = getLoaders();
const PreLoader = getPreLoaders();

Config = require('./webpack/config.client').load();
const ConfigClientDev = require('./webpack/config.client.dev');
Loader = merge(Loader, ConfigClientDev.loader());
Config = merge(Config, ConfigClientDev.config());

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
