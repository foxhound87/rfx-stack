import feathers from 'feathers';
import compression from 'compression';
import serveStatic from 'serve-static';

import { isoMiddleware } from './middleware/iso';
import { startWebServer as start } from './start';

import { Dir } from '../config';

const app = feathers();

app
  .use(compression())
  .set('view engine', 'ejs')
  .use('/build', serveStatic(Dir.build))
  .use('/static', serveStatic(Dir.static))
  .use(isoMiddleware)
  .configure(start);
