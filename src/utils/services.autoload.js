import path from 'path';
import globule from 'globule';
import { log } from './logger';

class ServicesSetup {
  init(props) {
    this.dir = props.dir;
    this.adapter = props.adapter;
    this.connector = props.connector;
    this.autoloader = props.autoloader;
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
    this.autoloader = props.autoloader;
    this.loadServices();
  }

  loadServices() {
    log.info('------------------------------------------');
    log.info('Loading services...');
    globule
      .find(path.join(this.dir, '*'))
      .map($service => this.autoloader($service));
    log.info('------------------------------------------');
  }
}

const servicesSetup = new ServicesSetup();

export function setupServices($props) {
  servicesSetup.init($props);
}

export function initServices() {
  new Services(this).init(servicesSetup);
}
