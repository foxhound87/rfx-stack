import { observable } from 'mobx';
import { service } from '../app';
import { factory } from '../seeds/post'; // just for test
import { action } from '../state/actions';
import _ from 'lodash';

export default class PostStore {

  query = {};

  @observable searchValue = '';

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

  updateList(list) {
    this.list = list;
  }

  emptyList() {
    this.list = [];
  }

  addItem(item) {
    this.list.pop();
    this.list.unshift(item);
  }

  create() {
    // we use factory() just for test
    return service('post').create(factory());
  }

  find(query = {}) {
    _.merge(this.query, query);
    return service('post')
      .find(this.query)
      .then((json) => this.updateList(json.data));
  }

  onCreated = (item) => {
    this.addItem(item);
  }

  @action
  search(title = null) {
    this.searchValue = title || '';
    return this.find({ query: { title: { $regex: `.*${this.searchValue}.*`, $options: 'i' } } });
  }

  @action
  filterBy(filter) {
    this.filter = filter;
    let completed;

    switch (this.filter) {
      case 'all': this.query.query.completed = undefined; break;
      case 'todo': completed = false; break;
      case 'done': completed = true; break;
      default: completed = 'all';
    }

    if (filter === 'all') return this.find();
    return this.find({ query: { completed } });
  }
}
