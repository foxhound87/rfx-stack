/* eslint global-require: 0 */
/* eslint import/first: 0 */
/* eslint import/newline-after-import: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
import './run/global';
import merge from 'webpack-merge';
import Globals from './webpack/globals';
import getLoaders from './webpack/loaders';

let Config;
let Loader = getLoaders();

Config = require('./webpack/config.client').load();
const ConfigClientDev = require('./webpack/config.client.dev');
Loader = merge(Loader, ConfigClientDev.loader());
Config = merge(Config, ConfigClientDev.config('web'));

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
