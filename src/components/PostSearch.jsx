import React, { Component } from 'react';
import { connect } from '../state/context';
// import cx from 'classnames';

// styles
// import styles from '../styles/post.search.css';

@connect
export default class PostSearch extends Component {

  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  handleSearch = (e) => {
    e.preventDefault();
    const val = e.target.value;
    this.setState({ search: val });
    this.context.store.post.search(val);
  };

  resetSearch = (e) => {
    e.preventDefault();
    this.setState({ search: '' });
    this.context.store.post.search('');
  };

  render() {
    return (
      <form>
        <input
          className="field rounded-left"
          type="text"
          placeholder="Search..."
          value={this.state.search}
          onChange={this.handleSearch}
        />
        <button
          onClick={this.resetSearch}
          className="btn rounded-right border black bg-silver"
        >X</button>
      </form>
    );
  }
}
