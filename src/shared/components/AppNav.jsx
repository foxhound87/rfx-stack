import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';
import cx from 'classnames';

// components
import Drawer from 'material-ui/Drawer';

// styles
import styles from '../styles/app.nav.css';

const handleOnRequestChange = (open) => {
  dispatch('ui.appNav.open', open);
};

const handleOnClick = () => {
  dispatch('ui.appNav.open', false);
};

const AppNav = ({ children, open, docked }) => (
  <Drawer
    className={cx(styles.drawer)}
    open={open}
    docked={docked}
    onRequestChange={handleOnRequestChange}
  >
    <div onClick={handleOnClick}>{children}</div>
  </Drawer>
);

AppNav.propTypes = {
  children: React.PropTypes.node,
  open: React.PropTypes.bool,
  docked: React.PropTypes.bool,
  onRequestChange: React.PropTypes.func,
};

export default connect(AppNav);
