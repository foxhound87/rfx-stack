import React from 'react';
import { dispatch, connect } from '~/src/utils/state';

const handleSearch = (e) => {
  e.preventDefault();
  const val = e.target.value;
  dispatch('post.search', val);
};

const resetSearch = (e) => {
  e.preventDefault();
  dispatch('post.search', null);
};

const PostSearch = ({ search }) => (
  <form>
    <input
      className="field rounded-left"
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
    />
    <button
      onClick={resetSearch}
      className="btn rounded-right border navy bg-silver"
    ><i className="fa fa-times" /></button>
  </form>
);

PostSearch.propTypes = {
  search: React.PropTypes.string,
};

export default connect(PostSearch);
