import { observable, action } from 'mobx';

export default class AuthModal {

  @observable isOpen = false;
  @observable showSection = 'signin';

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
}
