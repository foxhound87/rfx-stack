import compression from 'compression';
import cors from 'cors';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import adapter from 'feathers-mongoose';

import { setupServices, initServices } from '~/src/utils/services.autoload';
import { setupServer, startServer } from '~/src/utils/server.start';
import { logServerConfig } from '~/src/utils/logger';

import apiBeforeMiddleware from './middleware/api/before';
import apiAfterMiddleware from './middleware/api/after';

import auth from './auth';
import { connector } from './connector';
import { autoloader } from './autoloader';

const Dir = global.DIR;

setupServer({
  namespace: 'api',
  logger: logServerConfig,
});

setupServices({
  dir: __dirname,
  adapter,
  connector,
  autoloader,
});

const app = feathers()
  .configure(configuration(Dir.config, 'feathers'));

app
  .use(compression())
  .options('*', cors())
  .configure(apiBeforeMiddleware)
  .configure(hooks())
  .configure(rest())
  .configure(socketio(io => io.set('origins', '*:*')))
  .configure(auth)
  .configure(initServices)
  .configure(apiAfterMiddleware)
  .configure(startServer);
