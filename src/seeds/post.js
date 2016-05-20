import _ from 'lodash';
import faker from 'faker';
import { service } from '../app';

const items = [];

export function factory() {
  return {
    title: faker.name.title(),
    completed: faker.random.boolean(),
  };
}

function pushData() {
  items.push(factory());
}

export function postSeederDevelopment(n = 15) {
  _.times(n, pushData);
  return service('post').create(items);
}
