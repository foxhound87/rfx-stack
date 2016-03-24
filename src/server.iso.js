import Server from './server';
import { isoMiddleware } from './server/middleware/iso';

const config = {
  type: 'ISO',
  use: [isoMiddleware],
};

new Server(config).init();
