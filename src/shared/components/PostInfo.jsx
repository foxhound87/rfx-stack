import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ itemsFound, currentPage, totalPages }) => (
  <div>
    <b>{itemsFound} Items found</b> - <b>Page {currentPage} of {totalPages}</b>
  </div>
));
