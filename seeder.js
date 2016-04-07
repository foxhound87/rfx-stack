require('babel-core/register');
require('isomorphic-fetch');

global.CONFIG = require('./config').Config;

require('./src/seeds/_runner.js');
