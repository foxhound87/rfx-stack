import { stores } from '~/src/shared/stores';

const store = {};

export default function (state) {
  if (!state) return store;
  for (const [key, StoreClass] of Object.entries(stores)) {
    store[key] = new StoreClass(state[key]);
  }
  return store;
}
