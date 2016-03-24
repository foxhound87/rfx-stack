import Server from './server';
import { hotMiddleware } from './server/middleware/hot';
import { isoMiddleware } from './server/middleware/iso';

const config = {
  type: 'HOT/ISO',
  use: [
    hotMiddleware,
    isoMiddleware,
  ],
};

new Server(config).init();
