import { observable } from 'mobx';
import { toggle } from '~/src/utils/decorators';

@toggle('open', 'isOpen')
export default class PostCreateModal {

  @observable isOpen = false;
}
