import React, { Component } from 'react';
import { observer } from 'mobx-react';
import contextTypes from './contextTypes';

export class ContextProvider extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
    context: React.PropTypes.shape(contextTypes),
  };

  static childContextTypes = contextTypes;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return this.props && this.props.children;
  }
}

/**
 * Decorate components with context and observable
 * @param component
 * @returns {Function|Class}
 */
export function connect(component) {
  if (!component) return contextTypes;
  Object.assign(component, { contextTypes });
  return observer(component);
}
