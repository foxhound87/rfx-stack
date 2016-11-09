import React from 'react';
import { observer } from 'mobx-react';

// components
import TimeAgo from 'react-timeago';

// styles
import styles from '../styles/post.list.css';

const ItemsNotFound = () => (
  <div>
    <div className="divider border-top" />
    <h4 className="center">NO ITEMS FOUND</h4>
  </div>
);

const ItemsList = observer(({ items }) => (
  <ul>
    {items.map(item =>
      <li key={item.uuid} className="bg-white rounded px3 py2 mb2">
        <div className="md-flex">
          <div className="sm-col-12 pt2">
            <div className="h3"> {item.completed
              ? <i className="fa fa-check-circle olive" />
              : <i className="fa fa-times-circle red" />
            } {item.title}</div>
            <h5 className="gray">ID: {item.uuid}</h5>
          </div>
          <div className="sm-col-12 pt2 center">
            <p><b>Created at</b>: <TimeAgo date={item.createdAt} /></p>
            <p><b>Updated at:</b> <TimeAgo date={item.updatedAt} /></p>
          </div>
        </div>
      </li>)}
  </ul>
));

export default observer(({ items }) => (
  <div className={styles.postList}>
    {items.length
      ? <ItemsList items={items} />
      : <ItemsNotFound />}
  </div>
));
