import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from '../state/context';
import cx from 'classnames';

// components
import PostSearch from '../components/PostSearch';
import PostFilter from '../components/PostFilter';
import PostInfo from '../components/PostInfo';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

// styles
const button = cx(['btn', 'rounded', 'btn-outline']);

@connect
export default
class Home extends Component {

  static fetchData(store) {
    return store.post.find();
  }

  handleCreatePost = (e) => {
    e.preventDefault();
    this.context.store.post.create();
  };

  handlePostPageChange = (page) => {
    this.context.store.post.page(page);
  };

  render() {
    const post = this.context.store.post;

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
          title="My Title"
          titleTemplate="MySite.com - %s"
          defaultTitle="My Default Title"
          meta={[
            { name: 'description', content: 'Application description' },
            { property: 'og:type', content: 'article' },
          ]}
          onChangeClientState={(newState) => console.log('helmet', newState)}
        />

        <img width="20" src="/static/img/check.png" role="presentation" />
        <a href="/static/img/check.png">Check Static</a>
        <hr />

        <div className="center">
          <button
            type="button" value="done"
            onClick={this.handleCreatePost}
            className={cx(button)}
          >+ Add New Item</button>
        </div>
        <hr />

        <div className="md-flex flex-center">
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

        <hr />
        <PostList items={post.list} />
      </div>
    );
  }
}
