import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// styles
// import styles from '../styles/post.filter.css';
const button = cx(['btn', 'left', 'x-group-item']);

@connect
export default class PostFilter extends Component {

  static propTypes = {
    filter: React.PropTypes.string,
  };

  handleSelect = (e) => {
    e.preventDefault();
    const val = e.target.value;
    this.context.store.post.filterBy(val);
  };

  render() {
    const filter = this.props.filter;
    return (
      <div className="inline-block clearfix blue">
        <button
          type="button" value="all"
          onClick={this.handleSelect}
          className={cx(button, 'rounded-left', {
            'btn-outline': filter !== 'all',
            'btn-primary': filter === 'all',
          })}
        >All</button>
        <button
          type="button" value="todo"
          onClick={this.handleSelect}
          className={cx(button, 'not-rounded', {
            'btn-outline': filter !== 'todo',
            'btn-primary': filter === 'todo',
          })}
        >To Do</button>
        <button
          type="button" value="done"
          onClick={this.handleSelect}
          className={cx(button, 'rounded-right', {
            'btn-outline': filter !== 'done',
            'btn-primary': filter === 'done',
          })}
        >Done</button>
      </div>
    );
  }
}
