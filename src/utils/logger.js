import log from 'winston';
import getenv from 'getenv';

// set log as cli mode
log.cli();

export const webhost = key => ['http://',
  getenv([key.toUpperCase(), 'HOST'].join('_')), ':',
  getenv([key.toUpperCase(), 'PORT'].join('_')),
].join('');

const logInit = () => {
  log.info('------------------------------------------');
  log.info('--------------- RFX STACK ----------------');
  log.info('------------------------------------------');
};

const logServerAPI = (url) => {
  log.info('API Listening at:', url);
  log.info('Environment:', getenv('NODE_ENV'));
  log.info('------------------------------------------');
  log.info('Database Host:', getenv('DB_HOST'));
  log.info('Database Name:', getenv('DB_NAME'));
  log.info('Database Port:', getenv('DB_PORT'));
  log.info('------------------------------------------');
};

const logServerWEB = (url) => {
  log.info('API Listening at:', url);
  log.info('Environment:', getenv('NODE_ENV'));
  log.info('------------------------------------------');
  log.info('IO Host:', getenv('IO_HOST'));
  log.info('IO Port:', getenv('IO_PORT'));
  log.info('------------------------------------------');
};

export const logServerConfigWebpack = url => ([
  'RFX STACK',
  `WEB Listening at: ${webhost(url)}`,
  `Environment: ${getenv('NODE_ENV')}`,
  `IO Host: ${getenv('IO_HOST')}`,
  `IO Port: ${getenv('IO_PORT')}`,
]);

export const logServerConfig = (key = null) => {
  logInit();
  const url = webhost(key);
  return (key.toUpperCase() === 'API')
    ? logServerAPI(url)
    : logServerWEB(url);
};

export { log };
