require('isomorphic-fetch');

const dotenv = require('dotenv');
const path = require('path');
const logInit = require('../src/utils/logger').logInit;
const dir = require('../config/dir').default;

logInit();
dotenv.config();
global.DIR = dir(path);
