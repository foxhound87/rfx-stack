import { logServerConfig } from './logger';

class Start {

  constructor(app, type = null) {
    this.app = app;
    this.type = type;

    this.fixUA();
  }

  init() {
    const config = this.getApiConfig() || this.getWebConfig();

    this.app
      .listen(
        this.type === 'API' ? config.api.port : config.web.port,
        this.type === 'API' ? config.api.host : config.web.host,
      )
      .on('listening', () => logServerConfig(this.type));
  }

  getApiConfig() {
    return this.app.get('server');
  }

  getWebConfig() {
    return {
      web: global.CONFIG.web,
      io: global.CONFIG.io,
    };
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
  new Start(this, 'WEB').init();
}
