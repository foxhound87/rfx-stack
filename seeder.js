require('babel-core/register');
require('isomorphic-fetch');

global.CONFIG = require('./src/config').Config;

require('./src/seeds/_runner.js');
