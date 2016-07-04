import { observable, action, computed } from 'mobx';
import { service } from '~/src/shared/app';
import { factory } from '~/src/seeds/factories/post'; // just for test
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
  @observable $pagination = {};

  init() {
    // run events on client side-only
    if (global.TYPE === 'CLIENT') this.initEvents();
  }

  initEvents() {
    service('post').on('created', action(this.onCreated));  // onCreated = (data, params) => {}
    // service('post').on('updated', action(this.onUpdated));   // onUpdated = (id, data) => {}
    // service('post').on('patched', action(this.onPatched));   // onPatched = (id, data) => {}
    // service('post').on('removed', action(this.onRemoved));   // onRemoved = (id, params) => {}
  }

  updateList(json) {
    this.list = json.data;
    this.$pagination = _.omit(json, 'data');
  }

  @computed
  get pagination() {
    const { total, limit, skip } = this.$pagination;
    return _.extend(this.$pagination, {
      pages     : Math.ceil(total / limit),
      current   : Math.ceil((skip - 1) / limit) + 1,
    });
  }

  emptyList() {
    this.list = [];
  }

  addItem(item) {
    if (this.list.length >= this.$pagination.limit) this.list.pop();
    this.list.unshift(item);
    this.$pagination.total++;
  }

  create(data = null) {
    // we use factory() just for test
    return service('post').create(data || factory());
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
    const skipPage = this.$pagination.limit * (page - 1);
    const { pages } = this.$pagination;
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
