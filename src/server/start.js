import { Config } from '~/config';
import { logServerConfig } from './logger';

class Start {

  constructor(app, type = null) {
    this.app = app;
    this.type = type;

    this.fixUA();
  }

  init() {
    this.app
      .listen(
        this.type === 'API' ? Config.api.port : Config.web.port,
        this.type === 'API' ? Config.api.host : Config.web.host,
      )
      .on('listening', () => logServerConfig(this.type));
  }

  fixUA() {
    // Tell any CSS tooling (such as Material UI) to use
    // "all" vendor prefixes if the user agent is not known.
    global.navigator = global.navigator || {};
    global.navigator.userAgent = global.navigator.userAgent || 'all';
  }
}

export function startApiServer() {
  new Start(this, 'API').init();
}

export function startWebServer() {
  new Start(this).init();
}
