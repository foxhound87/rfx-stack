import { observable, action } from 'mobx';
import { service } from '../app';
import { factory } from '../seeds/post'; // just for test
import _ from 'lodash';

export default class PostStore {

  query = {};

  @observable searchValue = '';

  @observable filter = 'all';

  @observable list = [];

  /*
    "total": "<total number of records>",
    "limit": "<max number of items per page>",
    "skip": "<number of skipped items (offset)>",
    "current": "<current page number>"
    "pages": "<total number of pages>"
  */
  @observable pagination = {};

  constructor(post) {
    Object.assign(this, post);
    // run events on client side-only
    if (global.CLIENT) this.initEvents();
  }

  initEvents() {
    service('post').on('created', action(this.onCreated));  // onCreated = (data, params) => {}
    // service('post').on('updated', action(this.onUpdated));   // onUpdated = (id, data) => {}
    // service('post').on('patched', action(this.onPatched));   // onPatched = (id, data) => {}
    // service('post').on('removed', action(this.onRemoved));   // onRemoved = (id, params) => {}
  }

  updateList(json) {
    this.updatePagination(json);
    this.list = json.data;
  }

  updatePagination(json) {
    this.pagination = _.omit(json, 'data');
    const { total, limit, skip } = json;
    this.pagination.pages = Math.ceil(total / limit);
    this.pagination.current = Math.ceil((skip - 1) / limit) + 1;
  }

  emptyList() {
    this.list = [];
  }

  addItem(item) {
    this.list.pop();
    this.list.unshift(item);
    this.pagination.total++;
  }

  create() {
    // we use factory() just for test
    return service('post').create(factory());
  }

  find(query = {}) {
    _.merge(this.query, query);
    return service('post')
      .find(this.query)
      .then(action((json) => this.updateList(json)));
  }

  /* EVENTS */

  onCreated = (item) => this.addItem(item);

  // onUpdated = (id, data) => {};

  // onPatched = (id, data) => {};

  // onRemoved = (id, params) => {};

  /* ACTIONS */

  @action
  page(page = 1) {
    const skipPage = this.pagination.limit * (page - 1);
    const { pages } = this.pagination;
    if (skipPage < 0 || page > pages) return null;
    return this.find({ query: { $skip: skipPage } });
  }

  @action
  search(title = null) {
    this.searchValue = title || '';
    return this.find({
      query: {
        $skip: 0,
        title: {
          $regex: `.*${this.searchValue}.*`,
          $options: 'i',
        },
      },
    });
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
