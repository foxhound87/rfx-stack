/* eslint global-require: 0 */
import { log } from '@/utils/logger';

const Dir = global.DIR;

export function autoloader($service) {
  const dir = $service.replace(Dir.api, '.'); // require build fix (".replace()")
  const ServiceConfig = require(dir + '/config.js').default; // eslint-disable-line
  const ServiceModel = require(dir + '/model.js').default; // eslint-disable-line

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
  service.before(require(dir + '/hooks.before.js').default); // eslint-disable-line
  service.after(require(dir + '/hooks.after.js').default); // eslint-disable-line
}
