import { observable, action } from 'mobx';

export default class PostCreateModal {

  @observable isOpen = false;

  constructor(data) {
    action(() => Object.assign(this, data));
  }

  @action
  toggle(flag = null, section = null) {
    if (!flag) this.isOpen = !this.isOpen;
    if (flag === 'open') this.isOpen = true;
    if (flag === 'close') this.isOpen = false;
    if (section) this.toggleSection(section);
  }
}
