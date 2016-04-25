import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';
import cx from 'classnames';

// styles
// import styles from '../styles/post.filter.css';
const buttonGroup = cx('btn', 'left', 'x-group-item');

const handleSelect = (e) => {
  e.preventDefault();
  const val = e.target.value;
  dispatch('post.filterBy', val);
};

const PostFilter = ({ filter }) => (
  <div className="inline-block clearfix blue">
    <button
      type="button" value="all"
      onClick={handleSelect}
      className={cx(buttonGroup, 'rounded-left', {
        'btn-outline': filter !== 'all',
        'btn-primary': filter === 'all',
      })}
    >All</button>
    <button
      type="button" value="todo"
      onClick={handleSelect}
      className={cx(buttonGroup, 'not-rounded', {
        'btn-outline': filter !== 'todo',
        'btn-primary': filter === 'todo',
      })}
    >To Do</button>
    <button
      type="button" value="done"
      onClick={handleSelect}
      className={cx(buttonGroup, 'rounded-right', {
        'btn-outline': filter !== 'done',
        'btn-primary': filter === 'done',
      })}
    >Done</button>
  </div>
);

PostFilter.propTypes = {
  filter: React.PropTypes.string,
};

export default connect(PostFilter);
