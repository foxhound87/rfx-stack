import { log } from '../utils/logger';

const handlerFile = ['./_handler.', process.env.NODE_ENV].join('');

let handler = require(handlerFile).handle();

if (Array.isArray(handler)) handler = Promise.all(handler);

log.info('========================');
log.info('Seeding...');
log.info('========================');

if (!handler) log.error('Seed Error');

handler
  .then(() => log.info('Seed Finish'))
  .then(() => process.exit());
