import React from 'react';
import { connect } from '~/src/utils/state';

const PostInfo = ({ itemsFound, currentPage, totalPages }) => (
  <div>
    <b>{itemsFound} Items found</b> - <b>Page {currentPage} of {totalPages}</b>
  </div>
);

PostInfo.propTypes = {
  itemsFound: React.PropTypes.number,
  totalPages: React.PropTypes.number,
  currentPage: React.PropTypes.number,
};

export default connect(PostInfo);
