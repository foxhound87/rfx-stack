import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from '~/src/utils/state';

const handleSearch = (e) => {
  e.preventDefault();
  const val = e.target.value;
  dispatch('post.search', val);
};

const resetSearch = (e) => {
  e.preventDefault();
  dispatch('post.search', null);
};

export default observer(({ search }) => (
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
));
