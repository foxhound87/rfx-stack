require('babel-core/register');
require('isomorphic-fetch');

const dotenv = require('dotenv');
const getenv = require('getenv');
const path = require('path');
const logInit = require('../src/utils/logger').logInit;
const dir = require('../config/dir').default;
const env = require('../config/expose').default;

logInit();
dotenv.config();
global.DIR = dir(path);

if (process.env.NODE_ENV === 'development') {
  global.CONFIG = getenv.multi(env);
}
