import path from 'path';
import globule from 'globule';
import Waterline from 'waterline';
import WaterlineConfig from '~/src/config/waterline';

import { Dir } from '../config';
import { log } from './logger';

export default class Services {

  init(app) {
    this.app = app;
    this.initDatabase();
  }

  initDatabase() {
    this.orm = new Waterline();
    // Load Models
    this.loadModels();
    // return this if ther's no feather server
    if (!this.app) return this;
    // Init Waterline ORM
    this.initModels((error, data) => this.loadServices(error, data));
  }

  initModels(callback) {
    this.orm.initialize(WaterlineConfig, callback);
  }

  loadModels() {
    globule
      .find(path.join(Dir.models, '*.js'))
      .map((model) => this.orm // require the model (".replace()": build fix)
        .loadCollection(require(model.replace(Dir.server, '.')).default));
  }

  loadServices(error, data) {
    if (error) log.error(error);

    // Setup services
    globule
      .find(path.join(Dir.services, '*.js'))
      .map(($service) => this.attachService($service, data));
  }

  attachService($service, data) {
    // require the service (".replace()": build fix)
    const Service = require($service.replace(Dir.server, '.')).default;
    // Create an instance of the Feather service
    const service = new Service({ paginate: {} });
    // extend the service object with the model
    Object.assign(service, {
      Model: data.collections[service.namespace],
    });
    // Attach the service to the app server
    log.info('Mapping Service', service.namespace);
    this.app.use(service.namespace, service);
  }
}

export default new Services;
