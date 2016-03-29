import isDev from 'isdev';

import feathers from 'feathers';
import feathersRest from 'feathers-rest';
import feathersSocketIO from 'feathers-socketio';

import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';

import services from './services';

import { Config, Dir } from '../config';
import { logServerConfig } from './logger';

export default class Server {

  constructor(props) {
    Object.assign(this, props);

    if (this.type !== 'API') {
      this.initServer();
      this.initTemplates();
      this.initServeStaticMiddlewares();
      this.initExtraMiddlewares();
    }

    if (this.type === 'API') {
      this.initApiServer();
      this.initExtraMiddlewares();
      this.initApiMiddlewares();
      this.initServices();
    }
  }

  initServer() {
    this.app = feathers();
  }

  initApiServer() {
    this.app = feathers()
      // Enable REST services
      .configure(feathersRest())
      // Enable Socket.io services
      .configure(feathersSocketIO((io) => io.set('origins', '*:*')));
  }

  initServices() {
    services.init(this.app);
  }

  initTemplates() {
    this.app.set('view engine', 'ejs');
  }

  initApiMiddlewares() {
    this.app
      .use(cors({ origin: true }))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }));
  }

  initServeStaticMiddlewares() {
    this.app
      .use('/build', serveStatic(Dir.build))
      .use('/static', serveStatic(Dir.static));
  }

  initExtraMiddlewares() {
    this.app
      .use(compression())
      .use(morgan(isDev ? 'dev' : 'combined'));

    if (this.use) this.use.map((middleware) => this.app.use(middleware));
  }

  init() {
    this.app
      .listen(
        this.type === 'API' ? Config.api.port : Config.web.port,
        this.type === 'API' ? Config.api.host : Config.web.host,
      (err) => logServerConfig(err, this.type));
  }
}
