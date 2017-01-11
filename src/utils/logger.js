import log from 'winston';
import getenv from 'getenv';

// set log as cli mode
log.cli();

function logInit() {
  log.info('------------------------------------------');
  log.info('--------------- RFX STACK ----------------');
  log.info('------------------------------------------');
}

function logServerAPI(url) {
  logInit();
  log.info('API Listening at:', url);
  log.info('Environment:', getenv('NODE_ENV'));
  log.info('------------------------------------------');
  log.info('Database Host:', getenv('DB_HOST'));
  log.info('Database Name:', getenv('DB_NAME'));
  log.info('Database Port:', getenv('DB_PORT'));
  log.info('------------------------------------------');
}

function logServerWEB(url) {
  return [
    'RFX STACK',
    `WEB Listening at: ${url}`,
    `Environment: ${getenv('NODE_ENV')}`,
    `IO Host: ${getenv('IO_HOST')}`,
    `IO Port: ${getenv('IO_PORT')}`,
  ];
}

function logServerConfig($key = null) {
  const key = $key.toUpperCase();

  const port = getenv([key, 'PORT'].join('_'));
  const host = getenv([key, 'HOST'].join('_'));

  const url = ['http://', host, ':', port].join('');

  if (key === 'API') return logServerAPI(url);
  if (key === 'WEB') return logServerWEB(url);
  return [];
}

export { log, logInit, logServerConfig };
