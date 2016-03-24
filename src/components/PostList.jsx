import React, { Component } from 'react';
import { connect } from '../state/context';

// module style
import styles from '../styles/post.list.mdl.css';

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
              <li key={item.id}>
                <h3>{item.title}</h3>
                <h4>Completed: {item.completed ? 'YES' : 'NO'}</h4>
                <p>ID: {item.id}</p>
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
