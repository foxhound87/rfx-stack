import { log } from '../server/logger';
import { Config } from '~/config';

const handlerFile = ['./_handler.', Config.env].join('');

const handler = require(handlerFile).handle();

log.info('========================');
log.info('Seeding...');
log.info('========================');

if (!handler) log.error('Seed Error');

handler
  .then(() => log.info('Seed Finish'))
  .then(() => process.exit());
