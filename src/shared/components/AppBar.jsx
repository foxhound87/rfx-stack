import React from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';

import styles from '@/shared/styles/AppBar.css';
import MenuLinksSX from './MenuLinksSX';
import MenuLinksDX from './MenuLinksDX';

const openNavBtn = cx('link', 'bn', 'ph3', 'pv3', 'fl', 'bg-transparent', 'pointer', '_c1');
const appBar = cx('animated', 'fadeIn', 'fixed', 'w-100', 'db', 'dt-l', 'bg-black-30');

// events
const handleNavToggle = (e) => {
  e.preventDefault();
  dispatch('ui.appNav.open');
};

export default observer(({
  authCheck,
  user,
  accountMenuIsOpen,
  layoutIsShifted,
}) => (
  <header
    className={cx(styles.bar, appBar, {
      [styles.leftShifted]: layoutIsShifted,
    })}
  >
    <div className="dtc-l v-mid w-75 db">
      <button
        onClick={handleNavToggle}
        className={cx(styles.openNavBtn, openNavBtn)}
      >
        <i className="fa fa-bars" />
      </button>
      <div className="dn di-l">
        <MenuLinksSX inline />
      </div>
    </div>
    <div className="dn dtc-ns v-mid w-25 tr">
      <MenuLinksDX
        inline
        user={user}
        authCheck={authCheck}
        accountMenuIsOpen={accountMenuIsOpen}
      />
    </div>
  </header>
));

