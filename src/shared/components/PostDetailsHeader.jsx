import React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';
import $ from '@/shared/styles/_.mixins';

const handleEditPost = (e) => {
  e.preventDefault();
  dispatch('ui.postCreateModal.open', true);
};

export default observer(({ post }) => (
  <div className="tc mb4">
    <h3 className="text-center">{post.name || 'Post Details'}</h3>

    <div className="fl t4">
      <button
        type="button"
        value="done"
        onClick={() => browserHistory.push('/messages')}
        className={$.buttonPill}
      >
        <i className="fa fa-chevron-left" /> Messages
      </button>
    </div>

    <div className="fr t4">
      <button
        type="button"
        value="done"
        onClick={handleEditPost}
        className={$.buttonPill}
      >
        <i className="fa fa-edit" /> Edit
      </button>
    </div>
  </div>
));
