import _ from 'lodash';
import faker from 'faker';
import { service } from '~/src/app';

const items = [];

function pushData() {
  items.push({
    uuid: faker.random.uuid(),
    title: faker.name.title(),
    completed: faker.random.boolean(),
  });
}

export function postSeederDevelopment(n = 15) {
  _.times(n, pushData);
  return service('post').create(items);
}
