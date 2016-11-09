import React, { Component } from 'react';
import Helmet from 'react-helmet';
// import { connect } from '~/src/utils/state';
import { observer } from 'mobx-react';
import cx from 'classnames';

// components
import PostSearch from '../components/PostSearch';
import PostFilter from '../components/PostFilter';
import PostInfo from '../components/PostInfo';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import PostCreateModal from '../components/PostCreateModal';

// form
import postForm from '../forms/post';

// styles
const button = cx(['btn', 'rounded', 'btn-outline']);

@observer(['store'])
export default class DemoList extends Component {

  static fetchData({ store }) {
    return store.post.find();
  }

  static propTypes = {
    store: React.PropTypes.object,
  };

  handleAddRandomPost = (e) => {
    e.preventDefault();
    this.props.store.post.create();
  };

  handleCreatePost = (e) => {
    e.preventDefault();
    const { ui } = this.props.store;
    ui.postCreateModal.open(true);
  };

  handlePostPageChange = (page) => {
    this.props.store.post.page(page);
  };

  render() {
    const { ui, post } = this.props.store;

    return (
      <div className="mt4">
        <Helmet title="Message List" />
        <div className="center py3">
          <button
            type="button" value="done"
            onClick={this.handleAddRandomPost}
            className={cx(button, 'm1')}
          ><i className="fa fa-plus-circle" /> Add Random Item</button>
          <button
            type="button" value="done"
            onClick={this.handleCreatePost}
            className={cx(button, 'm1', '_yellow')}
          ><i className="fa fa-plus-square" /> Create New Item</button>
        </div>

        <div className="md-flex flex-center px4 py2">
          <div className="p1 py2">
            <PostSearch search={post.searchValue} />
          </div>
          <div className="flex-auto p1 py2 center">
            <PostInfo
              itemsFound={post.pagination.total}
              totalPages={post.pagination.pages}
              currentPage={post.pagination.current}
            />
          </div>
          <div className="p1 py2">
            <PostFilter filter={post.filter} />
          </div>
          <div className="p1 py2">
            <Pagination
              currentPage={post.pagination.current}
              onPageChange={this.handlePostPageChange}
            />
          </div>
        </div>

        <div className="px4 py2 navy">
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
