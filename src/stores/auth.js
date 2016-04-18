// import { observable } from 'mobx';

export default class AuthStore {

  ssrLocation = null;

  constructor(auth) {
    Object.assign(this, auth);
  }
}
