import compression from 'compression';
import cors from 'cors';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';

import apiBeforeMiddleware from './middleware/api/before';
import apiAfterMiddleware from './middleware/api/after';

import auth from './auth';
import adapter from 'feathers-mongoose';
import { connector } from './connector';
import { setupServicesAutoload, initServicesAutoload } from './services';
import { startApiServer as start } from '../utils/server.start';

const Dir = global.DIR;

setupServicesAutoload({
  dir: __dirname,
  adapter,
  connector,
});

const app = feathers()
  .configure(configuration(Dir.config, 'feathers'));

app
  .use(compression())
  .options('*', cors())
  .configure(apiBeforeMiddleware)
  .configure(hooks())
  .configure(rest())
  .configure(socketio((io) => io.set('origins', '*:*')))
  .configure(auth)
  .configure(initServicesAutoload)
  .configure(apiAfterMiddleware)
  .configure(start);
