import Server from './server';
import { apiMiddleware } from './server/middleware/api';

new Server({
  type: 'API',
  use: [apiMiddleware],
})
.init();
