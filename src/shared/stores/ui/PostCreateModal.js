import { observable, action } from 'mobx';
import { toggle } from '~/src/utils/decorators/toggle';

@toggle('open', 'isOpen')
export default class PostCreateModal {

  @observable isOpen = false;

  constructor(data) {
    action(() => Object.assign(this, data));
  }
}
