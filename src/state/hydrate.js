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
