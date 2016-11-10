import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

// components
import PostListHeader from '../components/PostListHeader';
import PostListBar from '../components/PostListBar';
import PostList from '../components/PostList';
import PostCreateModal from '../components/PostCreateModal';

// form
import postForm from '../forms/post';

@observer(['store'])
export default class DemoList extends Component {

  static fetchData({ store }) {
    return store.post.find();
  }

  static propTypes = {
    store: React.PropTypes.object,
  };

  render() {
    const { ui, post } = this.props.store;

    return (
      <div className="pt5">
        <Helmet title="Message List" />
        <PostListHeader />
        <PostListBar post={post} />
        <div className="pa4 _c4">
          <PostList items={post.list} />
        </div>
        <PostCreateModal
          open={ui.postCreateModal.isOpen}
          form={postForm}
        />
      </div>
    );
  }
}
