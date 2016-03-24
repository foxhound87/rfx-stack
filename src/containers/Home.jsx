import React, { Component } from 'react';
import { connect } from '../state/context';

// components
import PostSearch from '../components/PostSearch';
import PostList from '../components/PostList';

@connect
export default class Home extends Component {

  static fetchData(store) {
    return store.post.find();
  }

  render() {
    const items = this.context.store.post.list;
    return (
      <div>
        <img width="20" src="/static/img/check.png" />
        <a href="/static/img/check.png">Check Static</a>
        <hr />
        <PostSearch />
        <PostList items={items} />
      </div>
    );
  }
}
