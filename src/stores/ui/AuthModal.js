import { observable, action } from 'mobx';
import _ from 'lodash';

export default class AuthModal {

  @observable isOpen = false;

  @observable showSection = 'signin';

  @observable signinErrors = null;

  @observable signupErrors = null;

  @observable signinModel = {
    email: '',
    password: '',
  };

  @observable signupModel = {
    email: '',
    password: '',
    username: '',
  };

  constructor(data) {
    Object.assign(this, data);
  }

  @action
  toggle(flag = null, section = null) {
    if (!flag) this.isOpen = !this.isOpen;
    if (flag === 'open') this.isOpen = true;
    if (flag === 'close') this.isOpen = false;
    if (section) this.toggleSection(section);
  }

  @action
  toggleSection(to = 'signin') {
    if (to === 'signin') this.showSection = 'signin';
    if (to === 'signup') this.showSection = 'signup';
  }

  @action
  updateSigninModel(newValue) {
    _.merge(this.signinModel, newValue);
  }

  @action
  updateSignupModel(newValue) {
    _.merge(this.signupModel, newValue);
  }

  @action
  setSigninErrors(data) {
    this.signinErrors = data;
  }

  @action
  setSignupErrors(data) {
    this.signupErrors = data;
  }

  @action
  getCredentials(type = null) {
    if (type === 'signin') return this.signinModel;
    if (type === 'signup') return this.signupModel;
    return null;
  }
}
