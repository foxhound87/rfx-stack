require('babel-register');
require('./init');

const getenv = require('getenv');
const env = require('../config/expose');

global.CONFIG = getenv.multi(env).default;

require('../src/utils/seeder.runner')
  .default('./src/seeds/');
