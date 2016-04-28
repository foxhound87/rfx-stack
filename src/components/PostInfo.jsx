import React from 'react';
import { connect } from '../state/context';

const PostInfo = ({ found }) => (
  <div className="gray">
    <b>{found} Items found</b>
  </div>
);

PostInfo.propTypes = {
  found: React.PropTypes.number,
};

export default connect(PostInfo);
