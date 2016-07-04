import { observable } from 'mobx';
import { toggle } from '~/src/utils/decorators';

@toggle('toggleAccountMenu', 'accountMenuIsOpen')
export default class AppBar {

  @observable accountMenuIsOpen = false;
}
