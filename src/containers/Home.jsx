import React, { Component } from 'react';
import { connect } from '../state/context';

// components
import PostSearch from '../components/PostSearch';
import PostFilter from '../components/PostFilter';
import PostInfo from '../components/PostInfo';
import PostList from '../components/PostList';

@connect
export default class Home extends Component {

  static fetchData(store) {
    return store.post.find();
  }

  render() {
    const items = this.context.store.post.list;
    const filter = this.context.store.post.filter;

    return (
      <div>
        <img width="20" src="/static/img/check.png" />
        <a href="/static/img/check.png">Check Static</a>
        <hr />

        <div className="md-flex flex-center">
          <div className="p1"><PostSearch /></div>
          <div className="flex-auto p1 py2 center"><PostInfo items={items} /></div>
          <div className="p1 py2"><PostFilter filter={filter} /></div>
        </div>

        <hr />
        <PostList items={items} filter={filter} />
      </div>
    );
  }
}
