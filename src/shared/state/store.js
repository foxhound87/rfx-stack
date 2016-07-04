import { stores } from '~/src/shared/stores';
import { action } from 'mobx';
import _ from 'lodash';

const store = {};

function extendWithSubClass(obj, state) {
  const $extend = obj.___extend;
  if (!$extend) return;

  Object.keys($extend)
    .forEach((subkey) => {
      const SubClass = $extend[subkey];
      const $substate = state[subkey] || {};
      const $subobj = new SubClass($substate);
      Object.assign(obj, { [subkey]: $subobj });
      // recursion for deep nested classes
      extendWithSubClass($subobj, $substate);
      if (_.isFunction(obj[subkey].init)) {
        obj[subkey].init($substate);
      }
    });
}

export default function (state) {
  if (!state) return store;
  for (const [key, StoreClass] of Object.entries(stores)) {
    const $state = state[key] || {};
    const $obj = new StoreClass($state);
    action(() => Object.assign($obj, $state));
    extendWithSubClass($obj, $state);
    store[key] = $obj;
    if (_.isFunction($obj.init)) {
      $obj.init($state);
    }
  }
  return store;
}
