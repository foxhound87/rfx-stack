import log from 'winston';
import getenv from 'getenv';

// set log as cli mode
log.cli();

function logInit() {
  log.info('------------------------------------------');
  log.info('--------------- RFX STACK ----------------');
  log.info('------------------------------------------');
}

function logServerConfig(type = null) {
  const port = type === 'API' ? getenv('API_PORT') : getenv('WEB_PORT');
  const host = type === 'API' ? getenv('API_HOST') : getenv('WEB_HOST');

  const url = ['http://', host, ':', port].join('');

  if (type === 'API') {
    log.info('------------------------------------------');
    log.info('API Listening at:', url);
    log.info('------------------------------------------');
    log.info('Database Host:', getenv('DB_HOST'));
    log.info('Database Name:', getenv('DB_NAME'));
    log.info('Database Port:', getenv('DB_PORT'));
    log.info('------------------------------------------');
  }

  if (type !== 'API') {
    log.info('WEB Listening at:', url);
    log.info('Environment:', getenv('NODE_ENV'));
    log.info('------------------------------------------');
    log.info('IO Host:', getenv('IO_HOST'));
    log.info('IO Port:', getenv('IO_PORT'));
    log.info('------------------------------------------');
  }
}

export { log, logInit, logServerConfig };
