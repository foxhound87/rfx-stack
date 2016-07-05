import React, { Component } from 'react';

export default class ContextProvider extends Component {

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return this.props && this.props.children;
  }
}
