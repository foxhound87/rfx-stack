import { observable } from 'mobx';
import { toggle } from 'rfx-core';

@toggle('open', 'isOpen')
export default class PostCreateModal {

  @observable isOpen = false;
}
