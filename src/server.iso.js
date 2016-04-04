import Server from './server';
import { extraMiddleware } from './server/middleware/extra';
import { isoMiddleware } from './server/middleware/iso';

new Server({
  type: 'ISO',
  use: [
    extraMiddleware,
    isoMiddleware,
  ],
})
.init();
