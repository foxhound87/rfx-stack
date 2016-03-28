import React, { Component } from 'react';
import { connect } from '../state/context';

@connect
export default class PostInfo extends Component {

  static propTypes = {
    items: React.PropTypes.object,
    filter: React.PropTypes.object,
  };

  render() {
    const items = this.props.items;
    return (
      <div className="gray">
        <b>{items.length} Items found</b>
      </div>
    );
  }
}
