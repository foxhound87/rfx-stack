import { observable, action } from 'mobx';

export default class AppBar {

  @observable accountMenuIsOpen = false;

  constructor(data) {
    Object.assign(this, data);
  }

  @action
  toggleAccountMenu(flag = null) {
    if (flag === 'open') this.accountMenuIsOpen = true;
    if (flag === 'close') this.accountMenuIsOpen = false;
    if (!flag) this.accountMenuIsOpen = !this.accountMenuIsOpen;
  }
}
