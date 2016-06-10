// import { observable } from 'mobx';

export default class AppStore {

  ssrLocation = null;

  constructor(app) {
    Object.assign(this, app);
  }
}
