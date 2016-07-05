/* eslint no-param-reassign: 0 */
/* Code From: https://github.com/nightwolfz/mobx-connect */
import { observer } from 'mobx-react';

const defaultContextTypes = {};

/**
 * Create contextTypes object from an array of strings.
 * @param ctxTypes {Array}
 * @returns {Object}
 */
function createContextTypes(ctxTypes) {
  return ctxTypes.reduce((obj, ctxItem) => {
    obj[ctxItem] = () => {};
    return obj;
  }, {});
}

function composeWithContext(args, makeObservable) {
  if (args && args.length) {
    // @connect / The first argument is the component.
    if (typeof args[0] === 'function') {
      args[0].contextTypes = defaultContextTypes;
      return makeObservable ? observer(args[0]) : args[0];
    }
    // @connect('store', 'state', ''...) / Custom context
    return (component) => {
      component.contextTypes = createContextTypes(args);
      return makeObservable ? observer(component) : component;
    };
  }
  // @connect() / Use default context
  return (component) => {
    component.contextTypes = defaultContextTypes;
    return makeObservable ? observer(component) : component;
  };
}

/**
 * Decorate components with context and observable
 * @param args {Component|...String}
 * @returns {Function|Class}
 */
export function connect(...args) {
  return composeWithContext(args, true);
}

/**
 * Grant components access to store and state without making observable
 * @param args {Component|...String}
 * @returns {Component|Object}
 */
export function provide(...args) {
  return composeWithContext(args, false);
}
