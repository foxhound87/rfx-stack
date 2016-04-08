import { observable } from 'mobx';
import { service } from '../app';
import { factory } from '../seeds/post'; // just for test
import _ from 'lodash';

export default class PostStore {

  query = {};

  @observable filter = 'all';

  @observable list = [];

  constructor(post) {
    Object.assign(this, post);
    // run events on client side-only
    if (global.CLIENT) this.initEvents();
  }

  initEvents() {
    service('post').on('created', this.onCreated);   // onCreated = (data, params) => {}
    // service('post').on('updated', this.onUpdated);   // onUpdated = (id, data) => {}
    // service('post').on('patched', this.onPatched);   // onPatched = (id, data) => {}
    // service('post').on('removed', this.onRemoved);   // onRemoved = (id, params) => {}
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
    return this.find({ query: { title: { $regex: `.*${title}.*`, $options: 'i' } } });
  }

  find(query = {}) {
    _.merge(this.query, query);
    return service('post')
      .find(this.query)
      .then((json) => this.list = json.data);
  }

  create() {
    // we use factory() just for test
    return service('post').create(factory());
  }

  onCreated = (item) => {
    this.list.pop();
    this.list.unshift(item);
  }
}
