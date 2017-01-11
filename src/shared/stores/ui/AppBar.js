import { observable } from 'mobx';
import { toggle } from 'rfx-core';

@toggle('toggleAccountMenu', 'accountMenuIsOpen')
export default class AppBar {

  @observable accountMenuIsOpen = false;
}
