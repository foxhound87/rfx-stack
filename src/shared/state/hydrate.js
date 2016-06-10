import jsonStringifySafe from 'json-stringify-safe';
import { toJS } from 'mobx';
import initStore from './store';

/**
 Dehydrate (on server)
*/
export function dehydrate(store) {
  // convert store to json
  return jsonStringifySafe(toJS(store, true));
}

/**
  Rehydrate (on client)
*/
export function rehydrate() {
  // inject initial state into stores
  return initStore(window.__STATE);
}


/**
  HRM Rehydrate (on 'module.hot.accept')
*/
export function hotRehydrate() {
  if (window.__STORE) {
    window.__STORE = initStore(JSON.parse(dehydrate(window.__STORE)));
  }
  if (!window.store) {
    window.__STORE = initStore();
  }
  return window.__STORE;
}
