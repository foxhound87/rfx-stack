import path from 'path';
import globule from 'globule';
import mongoose from 'mongoose';
import adapter from 'feathers-mongoose';

import { Dir, Config } from '~/config';
import { log } from './logger';

class Services {

  init(app) {
    this.app = app;
    this.initDatabase();
    this.loadServices();
  }

  initDatabase() {
    const { host, port, name } = Config.db;
    const uri = ['mongodb://', host, ':', port, '/', name].join('');
    this.orm = mongoose.connect(uri);
    mongoose.Promise = global.Promise;
  }

  loadServices() {
    log.info('------------------------------------------');
    log.info('Loading services...');
    globule
      .find(path.join(Dir.services, '*'))
      .map(($service) => this.attachService($service));
    log.info('------------------------------------------');
  }

  attachService($service) {
    // require the service (".replace()": build fix)
    const dir = $service.replace(Dir.server, '.');
    const ServiceConfig = require([dir, 'config.js'].join('/')).default;
    const ServiceModel = require([dir, 'model.js'].join('/')).default;

    // extend the service object with related model
    Object.assign(ServiceConfig.options, { Model: ServiceModel });

    // Create an instance of the Feather service
    const serviceInstance = adapter(ServiceConfig.options);

    // Attach the service to the app server
    log.info('Service', ServiceConfig.namespace);
    this.app.use(ServiceConfig.namespace, serviceInstance);

    // get the service
    const service = this.app.service(ServiceConfig.namespace);

    // Set up our before hooks
    service.before(require([dir, 'hooks.before.js'].join('/')).default);
    // Set up our after hooks
    service.after(require([dir, 'hooks.after.js'].join('/')).default);
  }
}

export default function () {
  new Services().init(this);
}
