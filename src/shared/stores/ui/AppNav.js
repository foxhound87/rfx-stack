import { observable } from 'mobx';
import { toggle } from 'rfx-core';

@toggle('open', 'isOpen')
@toggle('dock', 'isDocked')
export default class AppNav {

  @observable isOpen = false;
  @observable isDocked = false;
}
