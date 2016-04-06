import React, { Component } from 'react';
import { connect } from '../state/context';

// components
import TimeAgo from 'react-timeago';

// styles
import styles from '../styles/post.list.css';

@connect
export default class PostList extends Component {

  static propTypes = {
    items: React.PropTypes.object,
  };

  render() {
    const item = null;
    const items = this.props.items;
    return (
      <div className={styles.postList}>
        <ul>
          <If condition={items.length}>
            <For each="item" of={items}>
              <li key={item.uuid}>
                <h3>{item.title}</h3>
                <h4>Completed: {item.completed ? 'YES' : 'NO'}</h4>
                <p>Created at: <TimeAgo date={item.createdAt} /></p>
                <p>Updated at: <TimeAgo date={item.updatedAt} /></p>
                <p>ID: {item.uuid}</p>
                <hr />
              </li>
            </For>
          <Else />
            <h2>No Content</h2>
          </If>
        </ul>
      </div>
    );
  }
}
