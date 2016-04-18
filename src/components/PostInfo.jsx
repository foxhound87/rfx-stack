import React from 'react';
import { connect } from '../state/context';

const PostInfo = ({ items }) => (
  <div className="gray">
    <b>{items.length} Items found</b>
  </div>
);

PostInfo.propTypes = {
  items: React.PropTypes.object,
};

export default connect(PostInfo);
