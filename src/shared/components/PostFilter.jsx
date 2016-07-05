import React from 'react';
import { connect, dispatch } from '~/src/utils/state';
import cx from 'classnames';

// styles
const buttonGroup = cx('btn', 'left', 'x-group-item');

const handleSelect = (e) => {
  e.preventDefault();
  const val = e.target.value;
  dispatch('post.filterBy', val);
};

const PostFilter = ({ filter }) => (
  <div className="inline-block clearfix">
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
