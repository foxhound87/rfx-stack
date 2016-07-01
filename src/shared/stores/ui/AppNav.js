import { observable, action } from 'mobx';

export default class AppNav {

  @observable isOpen = false;

  @observable isDocked = false;

  constructor(data) {
    action(() => Object.assign(this, data));
  }

  @action
  toggle(flag = null) {
    if (flag === 'open') this.isOpen = true;
    if (flag === 'close') this.isOpen = false;
    if (!flag) this.isOpen = !this.isOpen;
  }

  @action
  dock(flag = null) {
    if (flag === 'on') this.isDocked = true;
    if (flag === 'off') this.isDocked = false;
  }
}
