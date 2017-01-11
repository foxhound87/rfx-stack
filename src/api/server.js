import feathers from 'feathers';
import configuration from 'feathers-configuration';
import local from 'feathers-authentication-local';
import jwt from 'feathers-authentication-jwt';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import adapter from 'feathers-mongoose';
import errorHandler from 'feathers-errors/handler';

import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { setupServices, initServices } from '@/utils/services.autoload';
import { setupServer, startServer } from '@/utils/server.start';
import { logServerConfig } from '@/utils/logger';

import auth from './auth';
import { connector } from './connector';
import { autoloader } from './autoloader';

import loggerMiddleware from './middleware/logger';
import notFoundMiddleware from './middleware/notFound';

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

const app = feathers();

app
  .configure(configuration())
  .use(compression())
  .options('*', cors())
  .use(cors({ origin: true }))
  .configure(rest())
  .configure(socketio(io => io.set('origins', '*:*')))
  .configure(hooks())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(auth)
  .configure(local())
  .configure(jwt())
  .configure(initServices)
  .use(notFoundMiddleware())
  .use(loggerMiddleware(app))
  .use(errorHandler({ html: false }))
  .configure(startServer);
