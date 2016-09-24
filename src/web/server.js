import feathers from 'feathers';
import compression from 'compression';
import ejs from 'ejs';

import { logServerConfig } from '~/src/utils/logger';
import { setupServer, startServer } from '~/src/utils/server.start';

// routes & ssr
import routes from '~/src/shared/routes';
import ssr from '~/src/web/ssr';

// webpack configs
import wpc from '~/webpack.config.client.babel';
import { wdmc, whmc } from '~/config/hot';

// middlewares
import { serveStaticMiddleware } from './middleware/serveStatic';
import { hotMiddleware } from './middleware/hot';
import { routingMiddleware } from './middleware/routing';


setupServer({
  namespace: 'web',
  logger: logServerConfig,
});

const Dir = global.DIR;

const app = feathers();

app
  .use(compression())
  .engine('ejs', ejs.renderFile)
  .set('view engine', 'ejs')
  .set('views', Dir.views)
  .configure(serveStaticMiddleware)
  .use(hotMiddleware({ wpc, wdmc, whmc }))
  .use(routingMiddleware(routes, ssr))
  .configure(startServer);

export default app;
