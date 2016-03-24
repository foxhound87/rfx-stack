import { observable } from 'mobx';
import { service } from '../app';

export default class PostStore {

  @observable list = [];

  constructor(post) {
    Object.assign(this, post);
  }

  find(query = {}) {
    return service('post')
      .find(query)
      .then((json) => this.list = json.data);
  }
}
