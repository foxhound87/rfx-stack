import _ from 'lodash';

export const actions = {};

function editAction(obj, src) {
  if (_.isArray(obj)) return obj.concat(src);
  return src;
}

function registerAction(className, methodName) {
  const obj = { [className]: new Array(methodName) };
  _.mergeWith(actions, obj, editAction);
}

export function action(obj, methodName, descriptor) {
  const className = obj.constructor.name;
  registerAction(className, methodName);
  return descriptor;
}
