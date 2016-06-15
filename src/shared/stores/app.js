import { action } from 'mobx';

export default class AppStore {

  ssrLocation = null;

  constructor(app) {
    action(() => Object.assign(this, app));
  }
}
