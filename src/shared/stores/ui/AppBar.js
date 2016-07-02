import { observable, action } from 'mobx';
import { toggle } from '~/src/utils/decorators/toggle';

@toggle('toggleAccountMenu', 'accountMenuIsOpen')
export default class AppBar {

  @observable accountMenuIsOpen = false;

  constructor(data) {
    action(() => Object.assign(this, data));
  }
}
