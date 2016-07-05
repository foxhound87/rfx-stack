import React from 'react';
import { connect } from '~/src/utils/state';

// components
import TimeAgo from 'react-timeago';

// styles
import styles from '../styles/post.list.css';

const item = null;

const PostList = ({ items }) => (
  <div className={styles.postList}>
    <ul>
      <If condition={items.length}>
        <For each="item" of={items}>
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
          </li>
        </For>
      <Else />
        <div className="divider border-top" />
        <h4 className="center">NO ITEMS FOUND</h4>
      </If>
    </ul>
  </div>
);

PostList.propTypes = {
  items: React.PropTypes.object,
};

export default connect(PostList);
