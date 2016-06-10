import getStore from './store';
import access from 'safe-access';
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
  const fn = access(store, namespace);
  const className = getClassName(namespace, store);
  const methodName = getMethodName(namespace);

  if (typeof fn === 'function') {
    const args = _.isArray(opt) ? opt : [opt];
    return access(store, [namespace, '()'].join(''), args);
  }

  throw new Error(`${methodName} is not an action of ${className}`);
}
