import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';
import $ from '@/shared/styles/_.mixins';

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
  <form className="cf">
    <input
      className={$.inputSearch}
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
    />
    <button
      onClick={resetSearch}
      className={$.buttonPillSearch}
    ><i className="fa fa-times" /></button>
  </form>
));
