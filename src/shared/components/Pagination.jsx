import React from 'react';
import { observer } from 'mobx-react';
import Paginator from 'react-pagify';
import $ from '@/shared/styles/_.mixins';

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
        > <i className="fa fa-chevron-left" /> </button>
      </Paginator.Button>
      <Paginator.Button page={currentPage + 1} className="dib">
        <button
          type="button"
          className={$.buttonGroupRight}
        > <i className="fa fa-chevron-right" /> </button>
      </Paginator.Button>
    </div>
  </Paginator.Context>
));
