import React, { Component } from 'react';
import { connect } from '../state/context';

// module style
// import styles from '../styles/post.search.mdl.css';

@connect
export default class PostSearch extends Component {

  handleSearch = (e) => {
    e.preventDefault();
    const val = e.target.value;
    const query = val ? { query: { title: `%${val}%` } } : {};
    this.context.store.post.find(query);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}
