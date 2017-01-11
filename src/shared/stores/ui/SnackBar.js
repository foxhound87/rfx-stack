import { observable, action } from 'mobx';

export default class SnackBar {

  @observable isOpen = false;
  @observable duration = 3000;
  @observable message = '';

  @action
  open(message) {
    this.message = message;
    this.isOpen = true;
  }

  @action
  close() {
    this.message = '';
    this.isOpen = false;
  }
}
