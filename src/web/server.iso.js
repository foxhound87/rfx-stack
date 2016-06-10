import feathers from 'feathers';
import compression from 'compression';
import ejs from 'ejs';

import { serveStaticMiddleware } from './middleware/serveStatic';
import { isoMiddleware } from './middleware/iso';
import { startWebServer as start } from '../utils/server.start';

const Dir = global.DIR;
const app = feathers();

app
  .use(compression())
  .engine('ejs', ejs.renderFile)
  .set('view engine', 'ejs')
  .set('views', Dir.views)
  .configure(serveStaticMiddleware)
  .use(isoMiddleware)
  .configure(start);
