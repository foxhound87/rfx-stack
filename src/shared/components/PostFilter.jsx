import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';
import cx from 'classnames';
import $ from '@/shared/styles/_.mixins';

const handleSelect = (e) => {
  e.preventDefault();
  const val = e.target.value;
  dispatch('post.filterBy', val);
};

export default observer(({ filter }) => (
  <div className="inline-block clearfix">
    <button
      type="button" value="all"
      onClick={handleSelect}
      className={cx($.buttonGroupLeft, {
        _bg1: filter === 'all',
      })}
    >All</button>
    <button
      type="button" value="todo"
      onClick={handleSelect}
      className={cx($.buttonGroupCenter, {
        _bg1: filter === 'todo',
      })}
    >To Do</button>
    <button
      type="button" value="done"
      onClick={handleSelect}
      className={cx($.buttonGroupRight, {
        _bg1: filter === 'done',
      })}
    >Done</button>
  </div>
));
