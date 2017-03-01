import _ from 'lodash';
import { extendObservable, observable, action, computed } from 'mobx';

import { service } from '@/shared/app';
import { factory } from '@/seeds/factories/post'; // just for test

import postForm, { init as initPostForm } from '@/shared/forms/post';

export default class PostStore {

  static post = {
    uuid: null,
    title: null,
    completed: null,
    createdAt: null,
    updatedAt: null,
  };

  query = {};

  @observable searchValue = '';

  @observable filter = 'all';

  @observable list = [];

  @observable selected = _.clone(PostStore.post);

  @observable editForm = postForm;

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
    service('post').on('updated', action(this.onUpdated));   // onUpdated = (data) => {}
    service('post').on('patched', action(this.onPatched));   // onPatched = (data) => {}
    // service('post').on('removed', action(this.onRemoved));   // onRemoved = (id, params) => {}
  }


  @action
  setSelected(json = {}) {
    if (_.isEmpty(json)) {
      return this.clearSelected();
    }

    this.editForm = initPostForm(json);

    console.log('Setting Selected Post: %o', json); //eslint-disable-line
    extendObservable(this.selected, json);

    return this.selected;
  }

  @action
  clearSelected() {
    extendObservable(this.selected, PostStore.post);
    console.assert(!this.selected.uuid, 'Selected Object UUID must be null'); // eslint-disable-line

    this.editForm = postForm;

    return this.selected;
  }

  @action
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

  @action
  emptyList() {
    this.list = [];
  }

  addItem(item) {
    if (this.list.length >= this.$pagination.limit) this.list.pop();
    this.list.unshift(item);
    this.$pagination.total += 1;
  }

  create(data = null) {
    // we use factory() just for test
    return service('post')
      .create(data || factory())
      .catch(err => console.error(err)); // eslint-disable-line no-console
  }

  update(data = {}, id = data.uuid) {
    return service('post')
      .patch(id, data)
      .catch(err => console.error(err)); // eslint-disable-line no-console
  }

  get(id) {
    if (_.isEmpty(id)) {
      return Promise.reject('Must Specify Message ID');
    }

    return service('post')
      .get(id)
      .then(post => this.setSelected(post))
      .catch(err => console.error(err)); // eslint-disable-line no-console
  }

  clear() {
    return this.clearSelected();
  }

  find(query = {}) {
    _.merge(this.query, query);
    return service('post')
      .find(this.query)
      .then(json => this.updateList(json));
  }

  /* EVENTS */

  onCreated = item => this.addItem(item);

  @action
  onUpdated = (data) => {
    console.log('Received Post Update: %O', data); // eslint-disable-line

    const existing = _.find(this.list, { uuid: data.uuid });
    if (existing) {
      _.extend(existing, data);
    }

    if (this.selected.uuid === data.uuid) {
      _.extend(this.selected, data);
    }
  };

  onPatched = this.onUpdated;

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
