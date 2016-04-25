import getStore from './store';
import access from 'safe-access';
import { actions } from './actions';
import _ from 'lodash';

function getClassNamespace(str) {
  const lastIndex = str.lastIndexOf('.');
  return str.substring(0, lastIndex);
}

function getClassName(ns, store) {
  return access(store, getClassNamespace(ns)).constructor.name;
}

function getMethodName(str) {
  const lastIndex = str.lastIndexOf('.');
  return str.substring(lastIndex + 1, str.length);
}

export function dispatch(namespace, ...opt) {
  const store = getStore();
  const className = getClassName(namespace, store);
  const methodName = getMethodName(namespace);
  const isAction = _.includes(actions[className], methodName);

  if (isAction) {
    const fn = access(store, namespace);
    if (typeof fn === 'function') {
      const args = _.isArray(opt) ? opt : [opt];
      return access(store, [namespace, '()'].join(''), args);
    }
    throw new Error(`The provided action ${methodName} does not exist in ${className}`);
  }

  throw new Error(`${methodName} is not an action of ${className}`);
}
