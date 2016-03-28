import { observable } from 'mobx';
import { service } from '../app';
import _ from 'lodash';

export default class PostStore {

  query = {};

  @observable filter = 'all';

  @observable list = [];

  constructor(post) {
    Object.assign(this, post);
  }

  filterBy(filter) {
    this.filter = filter;
    let completed;

    switch (this.filter) {
      case 'all': this.query.query.completed = undefined; break;
      case 'todo': completed = true; break;
      case 'done': completed = false; break;
      default: completed = 'all';
    }

    if (filter === 'all') return this.find();
    return this.find({ query: { completed } });
  }

  search(title) {
    return this.find({ query: { title: `%${title}%` } });
  }

  find(query = {}) {
    _.merge(this.query, query);

    return service('post')
      .find(this.query)
      .then((json) => this.list = json.data);
  }
}
