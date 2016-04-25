import React from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// components
import Drawer from 'material-ui/Drawer';

// styles
import styles from '../styles/app.nav.css';

const AppNav = ({ children, open, docked, onRequestChange }) => (
  <Drawer
    className={cx(styles.nav)}
    open={open}
    docked={docked}
    onRequestChange={onRequestChange}
  >
    {children}
  </Drawer>
);

AppNav.propTypes = {
  children: React.PropTypes.node,
  open: React.PropTypes.bool,
  docked: React.PropTypes.bool,
  onRequestChange: React.PropTypes.func,
};

export default connect(AppNav);
