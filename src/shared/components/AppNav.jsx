/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';
import cx from 'classnames';

// styles
import styles from '@/shared/styles/AppNav.css';

// components
import Drawer from 'material-ui/Drawer';

const handleOnRequestChange = (open) => {
  dispatch('ui.appNav.open', open);
};

const handleOnClick = () => {
  dispatch('ui.appNav.open', false);
};

export default observer(({ children, open, docked }) => (
  <Drawer
    className={cx(styles.drawer)}
    open={open}
    docked={docked}
    onRequestChange={handleOnRequestChange}
  >
    <div onClick={handleOnClick}>{children}</div>
  </Drawer>
));
