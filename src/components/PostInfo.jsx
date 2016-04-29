import React from 'react';
import { connect } from '../state/context';

const PostInfo = ({ itemsFound, currentPage }) => (
  <div className="gray">
    <b>{itemsFound} Items found</b> - <b>Page {currentPage}</b>
  </div>
);

PostInfo.propTypes = {
  itemsFound: React.PropTypes.number,
  currentPage: React.PropTypes.number,
};

export default connect(PostInfo);
