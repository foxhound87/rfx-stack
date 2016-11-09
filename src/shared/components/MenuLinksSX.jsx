import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

// components
import { Link } from 'react-router';

// stules
const btnBlock = cx('btn', 'block', 'py2', 'm0');
const btnInline = cx('btn', 'inline-block', 'py2', 'm0');

export default observer(({ inline }) => (
  <span>
    <Link className={inline ? btnInline : btnBlock} to="/" >Home</Link>
    <Link className={inline ? btnInline : btnBlock} to="/messages">Messages Demo</Link>
    <Link className={inline ? btnInline : btnBlock} to="/breakpoints">Breakpoints Demo</Link>
    <Link className={inline ? btnInline : btnBlock} to="/forms">Forms Management</Link>
  </span>
));

