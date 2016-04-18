import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// components
import PostSearch from '../components/PostSearch';
import PostFilter from '../components/PostFilter';
import PostInfo from '../components/PostInfo';
import PostList from '../components/PostList';

// styles
const button = cx(['btn', 'rounded', 'btn-outline']);

@connect
export default class Home extends Component {

  static fetchData(store) {
    return store.post.find();
  }

  handleCreate = (e) => {
    e.preventDefault();
    this.context.store.post.create();
  };

  render() {
    const post = this.context.store.post;
    const search = post.searchValue;
    const items = post.list;
    const filter = post.filter;

    return (
      <div>
        <img width="20" src="/static/img/check.png" role="presentation" />
        <a href="/static/img/check.png">Check Static</a>
        <hr />

        <div className="center">
          <button
            type="button" value="done"
            onClick={this.handleCreate}
            className={cx(button)}
          >+ Add New Item</button>
        </div>

        <hr />
        <div className="md-flex flex-center">
          <div className="p1 py2"><PostSearch search={search} /></div>
          <div className="flex-auto p1 py2 center"><PostInfo items={items} /></div>
          <div className="p1 py2"><PostFilter filter={filter} /></div>
        </div>

        <hr />
        <PostList items={items} filter={filter} />
      </div>
    );
  }
}
