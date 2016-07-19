/* eslint global-require: 0 */

import { log } from './logger';
import path from 'path';

function logStart() {
  log.info('--- Seeding... ---------------------------');
  log.info('------------------------------------------');
}

function logFinish() {
  log.info('--- Seed Finish --------------------------');
  log.info('------------------------------------------');
  process.exit();
}

function catchError() {
  log.info('--- Seed Error ---------------------------');
  log.info('------------------------------------------');
  process.exit();
}

export default ($path) => {
  const handlerFile = path.resolve($path, 'handlers', process.env.NODE_ENV);

  let handler = require(handlerFile).handle();

  if (Array.isArray(handler)) handler = Promise.all(handler);

  if (!handler) catchError();

  handler
    .then(logStart)
    .then(logFinish)
    .catch(catchError);
};
