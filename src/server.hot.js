import Server from './server';
import { extraMiddleware } from './server/middleware/extra';
import { hotMiddleware } from './server/middleware/hot';
import { isoMiddleware } from './server/middleware/iso';

new Server({
  type: 'HOT/ISO',
  use: [
    extraMiddleware,
    hotMiddleware,
    isoMiddleware,
  ],
}).init();
