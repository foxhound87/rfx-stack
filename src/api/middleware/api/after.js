import handler from 'feathers-errors/handler';
import { log } from '~/src/utils/logger';
import notFound from '../notFound';
import logger from '../logger';

export default function () {
  log.info('Init API Middleware: After');

  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.use(notFound());
  app.use(logger(app));
  app.use(handler({ html: false }));
}
