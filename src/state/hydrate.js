import jsonStringifySafe from 'json-stringify-safe';
import { toJSON } from 'mobx';
import initStore from './index';

/**
 Dehydrate (on server)
*/
export function dehydrate(store) {
  // convert store to json
  return jsonStringifySafe(toJSON(store, true));
}

/**
  Rehydrate (on client)
*/
export function rehydrate() {
  // get window state
  const initialState = window.__STATE;
  // update the store
  const store = initStore(initialState);
  // define and return the context
  return { store };
}
