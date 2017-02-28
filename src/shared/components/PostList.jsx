import React from 'react';
import { observer } from 'mobx-react';

// components
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';

// styles
import styles from '@/shared/styles/PostList.css';

const ItemsNotFound = () => (
  <div>
    <div className="divider border-top" />
    <h4 className="tc">NO ITEMS FOUND</h4>
  </div>
);

const ItemsList = observer(({ items }) => (
  <ul>
    {items.map(item =>
      <li key={item.uuid} className="cf bg-white br2 pv3 ph4 mb3">
        <div className="fl w-100 w-60-ns tc tl-ns">
          <div className="f4 pt3">
            {item.completed
              ? <i className="fa fa-check-circle green" />
              : <i className="fa fa-times-circle red" />
            } {item.title}
          </div>
          <div className="f5 pt3 gray">
            ID: <Link to={`/messages/${item.uuid}`}>{item.uuid}</Link>
          </div>
        </div>
        <div className="fl w-100 w-40-ns tc tl-ns">
          <p><b>Created at</b>: <TimeAgo date={item.createdAt} /></p>
          <p><b>Updated at:</b> <TimeAgo date={item.updatedAt} /></p>
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
