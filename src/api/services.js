import path from 'path';
import globule from 'globule';
import { log } from '../utils/logger';

const Dir = global.DIR;

class ServicesSetup {
  init(props) {
    this.adapter = props.adapter;
    this.connector = props.connector;
    this.dir = props.dir;
  }
}

/*
  Feathers Services Autoload
*/
class Services {

  constructor(app) {
    this.app = app;
  }

  init(props) {
    this.dir = path.resolve(props.dir, 'services');
    this.connector = props.connector;
    this.adapter = props.adapter;
    this.db = this.connector(this.app.get('server').db);
    this.loadServices();
  }

  loadServices() {
    log.info('------------------------------------------');
    log.info('Loading services...');
    globule
      .find(path.join(this.dir, '*'))
      .map(($service) => this.attachService($service));
    log.info('------------------------------------------');
  }

  attachService($service) {
    const dir = $service.replace(Dir.api, '.'); // require build fix (".replace()")
    const ServiceConfig = require([dir, 'config.js'].join('/')).default;
    const ServiceModel = require([dir, 'model.js'].join('/')).default;

    // extend the service object with related model
    Object.assign(ServiceConfig.options, { Model: ServiceModel });

    // Create an instance of the Feather service
    const serviceInstance = this.adapter(ServiceConfig.options);

    // Attach the service to the app server
    log.info('Service', ServiceConfig.namespace);
    this.app.use(ServiceConfig.namespace, serviceInstance);

    // get the service
    const service = this.app.service(ServiceConfig.namespace);

    // Setup our HOOKS (before/after)
    const beforeHooksDir = [dir, 'hooks.before.js'].join('/');
    const afterHooksDir = [dir, 'hooks.after.js'].join('/');
    service.before(require(beforeHooksDir).default);
    service.after(require(afterHooksDir).default);
  }
}

const servicesSetup = new ServicesSetup();

export function setupServicesAutoload($props) {
  servicesSetup.init($props);
}

export function initServicesAutoload() {
  new Services(this).init(servicesSetup);
}
