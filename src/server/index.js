import feathers from 'feathers';
import feathersRest from 'feathers-rest';
import feathersSocketIO from 'feathers-socketio';

import serveStatic from 'serve-static';

import services from './services';

import { Config, Dir } from '../config';
import { logServerConfig } from './logger';

export default class Server {

  constructor(props) {
    Object.assign(this, props);

    this.fixUA();

    if (this.type !== 'API') {
      this.initServer();
      this.initTemplates();
      this.initServeStatic();
      this.initMiddlewares();
    }

    if (this.type === 'API') {
      this.initApiServer();
      this.initMiddlewares();
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

  initServeStatic() {
    this.app
      .use('/build', serveStatic(Dir.build))
      .use('/static', serveStatic(Dir.static));
  }

  initMiddlewares() {
    if (this.use) this.use.map((middleware) => this.app.use(middleware));
  }

  init() {
    this.app
      .listen(
        this.type === 'API' ? Config.api.port : Config.web.port,
        this.type === 'API' ? Config.api.host : Config.web.host,
      (err) => logServerConfig(err, this.type));
  }

  fixUA() {
    // Tell any CSS tooling (such as Material UI) to use
    // "all" vendor prefixes if the user agent is not known.
    global.navigator = global.navigator || {};
    global.navigator.userAgent = global.navigator.userAgent || 'all';
  }
}
