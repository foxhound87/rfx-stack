import { observable, action } from 'mobx';
import { toggle } from '~/src/utils/decorators/toggle';

@toggle('open', 'isOpen')
@toggle('dock', 'isDocked')
export default class AppNav {

  @observable isOpen = false;
  @observable isDocked = false;

  constructor(data) {
    action(() => Object.assign(this, data));
  }
}
