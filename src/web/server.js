import feathers from 'feathers';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';

import { setupServer, startServer } from '@/utils/server.start';
import { logServerConfig } from '@/utils/logger';

// webpack configs
import wpc from '~/webpack.config.client.babel';
import { wdmc, whmc } from '~/config/hot';

// routes & ssr
import routes from '@/shared/routes';
import ssr from './ssr';

// middlewares
import { serveStaticMiddleware } from './middleware/serveStatic';
import { hotMiddleware } from './middleware/hot';
import { routingMiddleware } from './middleware/routing';

const Dir = global.DIR;

setupServer({
  namespace: 'web',
  logger: logServerConfig,
});

const app = feathers();

app
  .use(compression())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .engine('ejs', ejs.renderFile)
  .set('view engine', 'ejs')
  .set('views', Dir.views)
  .configure(serveStaticMiddleware)
  .use(hotMiddleware({ wpc, wdmc, whmc }))
  .use(routingMiddleware(routes, ssr))
  .configure(startServer);

export default app;
