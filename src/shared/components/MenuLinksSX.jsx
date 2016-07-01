import React from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// components
import { Link } from 'react-router';

// stules
const btnBlock = cx('btn', 'block', 'py2', 'm0');
const btnInline = cx('btn', 'inline-block', 'py2', 'm0');

const MenuLinksSX = ({ inline }) => (
  <span>
    <Link className={inline ? btnInline : btnBlock} to="/" >Home</Link>
    <Link className={inline ? btnInline : btnBlock} to="/messages">Messages Demo</Link>
    <Link className={inline ? btnInline : btnBlock} to="/breakpoints">Breakpoints Demo</Link>
  </span>
);

MenuLinksSX.propTypes = {
  inline: React.PropTypes.bool,
};

export default connect(MenuLinksSX);
