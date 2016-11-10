import React from 'react';
import { observer } from 'mobx-react';
import Paginator from 'react-pagify';
import $ from '~/src/shared/styles/_.mixins';

export default observer(({ currentPage, onPageChange }) => (
  <Paginator.Context
    className="pagify-pagination"
    segments={{ centerPage: [currentPage] }}
    onSelect={onPageChange}
  >
    <div className="inline-block clearfix">
      <Paginator.Button page={currentPage - 1} className="dib">
        <button
          type="button"
          className={$.buttonGroupLeft}
        > &lt; </button>
      </Paginator.Button>
      <Paginator.Button page={currentPage + 1} className="dib">
        <button
          type="button"
          className={$.buttonGroupRight}
        > &gt; </button>
      </Paginator.Button>
    </div>
  </Paginator.Context>
));
