import React from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
// import { dispatch } from 'rfx-core';
import cx from 'classnames';
import $ from '@/shared/styles/_.mixins';

const handleEditPost = post => (e) => {
  e.preventDefault();
  // dispatch('post.edit', post.uuid);
  alert(`TODO: Implement Editing of Post\n ${post.uuid}`); // eslint-disable-line
};

export default observer(({ post }) => (
  <div className="tc mb4">
    <h3 className="text-center">{post.name || 'Post Details'}</h3>

    <div className="fl t4">
      <button
        type="button"
        value="done"
        onClick={() => browserHistory.push('/messages')}
        className={cx($.buttonPill, '')}
      >
        <i className="fa fa-chevron-left" /> Messages
      </button>
    </div>

    <div className="fr t4">
      <button
        type="button"
        value="done"
        onClick={handleEditPost(post)}
        className={cx($.buttonPill, '')}
      >
        <i className="fa fa-edit" /> Edit
      </button>
    </div>
  </div>
));
