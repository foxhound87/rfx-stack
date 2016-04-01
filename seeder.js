require('babel-core/register');
require('isomorphic-fetch');

global.CONFIG = require('./src/config').Config;

require('./src/server/seeds/_runner.js');
