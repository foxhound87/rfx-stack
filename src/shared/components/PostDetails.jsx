import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import _ from 'lodash';

// components
import TimeAgo from 'react-timeago';

// styles
import styles from '@/shared/styles/PostList.css';

const NotLoaded = observer(({ item }) => (
  <div>
    <div className="divider border-top" />
    <h4 className="pt5">Loading ... {!item}</h4>
  </div>
));

const ItemDetail = observer(({ item }) => (
  <div className="cf bg-white br2 pv3 ph4 mb3">
    <div className="fl w-100 w-60-ns tc tl-ns">
      <div className="f4 pt3">
        { item.completed
          ? <i className="fa fa-check-circle green" />
          : <i className="fa fa-times-circle red" />}
        {' '}
        { item.title }
      </div>
      <div className="f5 pt3 gray">ID: { item.uuid }</div>
    </div>
    <div className="fl w-100 w-40-ns tc tl-ns">
      <p><b>Created at</b>: <TimeAgo date={item.createdAt} /></p>
      <p><b>Updated at:</b> <TimeAgo date={item.updatedAt} /></p>
    </div>
  </div>
));

export default observer(({ item }) => {
  console.log('Rendering Post Details for item: %o', toJS(item)); // eslint-disable-line

  return (
    <div className={styles.postList}>
      {_.isEmpty(item)
        ? <NotLoaded />
        : <ItemDetail item={item} />}
    </div>
  );
});
