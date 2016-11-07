const dotenv = require('dotenv');
const path = require('path');
const dir = require('../config/dir').default;

dotenv.config();
global.DIR = dir(path);
