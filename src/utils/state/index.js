import store from './store';
import { dispatch } from './dispatcher';
import { dehydrate, rehydrate, hotRehydrate } from './hydrate';
import { fetchData, fetchDataOnLocationMatch } from './fetch';

export {
  store,
  dispatch,
  dehydrate,
  rehydrate,
  hotRehydrate,
  fetchData,
  fetchDataOnLocationMatch,
};
