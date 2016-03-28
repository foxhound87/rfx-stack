import React, { Component } from 'react';
import { connect } from '../state/context';
// import cx from 'classnames';

// module style
// import styles from '../styles/post.search.mdl.css';

@connect
export default class PostSearch extends Component {

  handleSearch = (e) => {
    e.preventDefault();
    const val = e.target.value;
    this.context.store.post.search(val);
  };

  render() {
    return (
      <form>
        <input
          className="field"
          type="text"
          placeholder="Search..."
          onChange={this.handleSearch}
        />
      </form>
    );
  }
}
