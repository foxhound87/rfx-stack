import log from 'winston';
import PrettyError from 'pretty-error';
import { Config } from '../config';

const prettyError = new PrettyError();

// set log as cli mode
log.cli();

function logServerConfig(err, type) {
  if (err) log.error(prettyError.render(err));

  const port = type === 'API' ? Config.api.port : Config.web.port;
  const host = type === 'API' ? Config.api.host : Config.web.host;

  const url = ['http://', host, ':', port].join('');

  if (type === 'API') {
    log.info('API Listening at:', url);
    log.info('------------------------------------------');
    log.info('Database Host:', Config.db.host);
    log.info('Database Name:', Config.db.name);
    log.info('Database Port:', Config.db.port);
    log.info('------------------------------------------');
  }

  if (type !== 'API') {
    log.info('Rendering:', type);
    log.info('Environment:', Config.env);
    log.info('Listening at:', url);
    log.info('------------------------------------------');
  }
}

export { log, logServerConfig };
