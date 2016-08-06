import _ from 'lodash';
import access from 'safe-access';
import $store from './store';

function getNSClassNamespace(str) {
  const lastIndex = str.lastIndexOf('.');
  return str.substring(0, lastIndex);
}

function getNSMethodName(str) {
  const lastIndex = str.lastIndexOf('.');
  return str.substring(lastIndex + 1, str.length);
}

function getRealClassName(ns, store) {
  const className = getNSClassNamespace(ns);
  const $class = access(store, className);
  if (_.isUndefined($class)) throw new Error(`The Store ${className} does not exist!`);
  return $class.constructor.name;
}

export function dispatch(namespace, ...opt) {
  const store = $store.get();
  const fn = access(store, namespace);
  const className = getRealClassName(namespace, store);
  const methodName = getNSMethodName(namespace);

  if (_.isFunction(fn)) {
    const args = _.isArray(opt) ? opt : [opt];
    return access(store, [namespace, '()'].join(''), args);
  }

  throw new Error(`${methodName} is not an action of ${className}`);
}
