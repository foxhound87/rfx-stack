import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { dispatch } from 'rfx-core';
import $ from '@/shared/styles/_.mixins';

const handleAddRandomPost = (e) => {
  e.preventDefault();
  dispatch('post.create');
};

const handleCreatePost = (e) => {
  e.preventDefault();
  dispatch('ui.postCreateModal.open', true);
};

export default observer(() => (
  <div className="tc pt4">
    <button
      type="button"
      value="done"
      onClick={handleAddRandomPost}
      className={$.buttonPill}
    >
      <i className="fa fa-plus-circle" /> Add Random Item
    </button>
    <button
      type="button"
      value="done"
      onClick={handleCreatePost}
      className={cx($.buttonPill, '_c3', '_b3', 'ml4')}
    >
      <i className="fa fa-plus-square" /> Create New Item
    </button>
  </div>
));
