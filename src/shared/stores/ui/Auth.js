import { observable, action } from 'mobx';

export default class Auth {

  @observable modalIsOpen = false;

  @observable showSection = 'signin';

  @action toggleModal(flag = null, section = null) {
    if (!flag) this.modalIsOpen = !this.modalIsOpen;
    if (flag === 'open') this.modalIsOpen = true;
    if (flag === 'close') this.modalIsOpen = false;
    if (section) this.toggleSection(section);
  }

  @action toggleSection(to = 'signin') {
    if (to === 'signin') this.showSection = 'signin';
    if (to === 'signup') this.showSection = 'signup';
  }
}
