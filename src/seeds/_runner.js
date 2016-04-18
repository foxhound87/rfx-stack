import { log } from '../server/logger';
import { Config } from '~/config';

const handlerFile = ['./_handler.', Config.env].join('');

let handler = require(handlerFile).handle();

if (Array.isArray(handler)) handler = Promise.all(handler);

log.info('========================');
log.info('Seeding...');
log.info('========================');

if (!handler) log.error('Seed Error');

handler
  .then(() => log.info('Seed Finish'))
  .then(() => process.exit());
