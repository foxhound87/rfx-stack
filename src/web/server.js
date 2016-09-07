import feathers from 'feathers';
import compression from 'compression';
import ejs from 'ejs';

// routes & ssr
import routes from '~/src/shared/routes';
import ssr from '~/src/web/ssr';

// webpack configs
import wpc from '~/webpack.config.client.babel';
import { wdmc, whmc } from '~/config/hot.js';

// middlewares
import { serveStaticMiddleware } from './middleware/serveStatic';
import { hotMiddleware } from './middleware/hot';
import { routingMiddleware } from './middleware/routing';

const Dir = global.DIR;

const app = feathers();

app
  .use(compression())
  .engine('ejs', ejs.renderFile)
  .set('view engine', 'ejs')
  .set('views', Dir.views)
  .configure(serveStaticMiddleware)
  .use(hotMiddleware({ wpc, wdmc, whmc }))
  .use(routingMiddleware(routes, ssr));
  // .configure(startServer);

export default app;
