import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

// components
import Paginator from 'react-pagify';

// styles
const buttonGroup = cx('btn', 'left', 'x-group-item', 'btn-outline');

export default observer(({ currentPage, onPageChange }) => (
  <Paginator.Context
    className="pagify-pagination"
    segments={{ centerPage: [currentPage] }}
    onSelect={onPageChange}
  >
    <div className="inline-block clearfix">
      <Paginator.Button page={currentPage - 1} className="inline">
        <button
          type="button"
          className={cx(buttonGroup, 'rounded-left')}
        > &lt; </button>
      </Paginator.Button>
      <Paginator.Button page={currentPage + 1} className="inline">
        <button
          type="button"
          className={cx(buttonGroup, 'rounded-right')}
        > &gt; </button>
      </Paginator.Button>
    </div>
  </Paginator.Context>
));
