import feathers from 'feathers';
import compression from 'compression';

import { serveStaticMiddleware } from './middleware/serveStatic';
import { isoMiddleware } from './middleware/iso';
import { startWebServer as start } from './start';

const app = feathers();

app
  .use(compression())
  .set('view engine', 'ejs')
  .configure(serveStaticMiddleware)
  .use(isoMiddleware)
  .configure(start);
