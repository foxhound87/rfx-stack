/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from '~/src/utils/state';
import cx from 'classnames';

// styles
import styles from '../styles/menu.link.dx.css';

const ul = cx('list-reset', 'mb0');
const menuAccount = cx('absolute', 'right-0', 'nowrap', 'rounded');
const btnBlock = cx('btn', 'block', 'py2', 'm0');
const btnInline = cx('btn', 'inline-block', 'py2', 'm0');

const handleMenuAccountToggle = (e) => {
  e.preventDefault();
  dispatch('ui.appBar.toggleAccountMenu');
};

const handleAuthModalSignin = (e) => {
  e.preventDefault();
  dispatch('ui.authModal.toggle', 'open', 'signin');
};

const handleAuthModalSignup = (e) => {
  e.preventDefault();
  dispatch('ui.authModal.toggle', 'open', 'signup');
};

const handleLogout = (e) => {
  e.preventDefault();
  dispatch('auth.logout');
};

const UserSubMenu = () => (
  <ul className={ul}>
    <li>
      <a className="btn block" key="1">
        <i className="fa fa-user" /> Profile
      </a>
    </li>
    <li>
      <a className="btn block" key="2">
        <i className="fa fa-sliders" /> Settings
      </a>
    </li>
    <li>
      <a className="btn block" key="3" onClick={handleLogout}>
        <i className="fa fa-sign-out" /> Sign Out
      </a>
    </li>
  </ul>
);

const UserMenu = observer(({ inline, user, accountMenuIsOpen }) => (
  <span>
    <a
      onClick={inline && handleMenuAccountToggle}
      className={inline ? btnInline : btnBlock}
    >
      {user.email} {inline && <i className="fa fa-caret-down" />}
    </a>
    {inline ?
      <div
        className={cx(
          [styles.menuAccount, menuAccount],
          { hide: !accountMenuIsOpen },
        )}
      >
        <UserSubMenu />
      </div> :
      <div>
        <div className={cx(styles.divider, { 'border-top': !inline })} />
        <UserSubMenu />
      </div>}
  </span>
));

const GuestMenu = observer(({ inline }) => (
  <span>
    <a
      onClick={handleAuthModalSignin}
      className={cx(styles.baseBtn, {
        [styles.baseInlineBtn]: inline,
        [styles.loginBtn]: inline,
        ['inline-block']: inline,
        ['block']: !inline,
      })}
    >
      <i className="fa fa-sign-in" /> Login
    </a>
    <a
      onClick={handleAuthModalSignup}
      className={cx(styles.baseBtn, {
        [styles.baseInlineBtn]: inline,
        [styles.registerBtn]: inline,
        ['inline-block']: inline,
        ['block']: !inline,
      })}
    >
      Register
    </a>
  </span>
));

export default observer(({ user, inline, authCheck, accountMenuIsOpen }) => (
  <span>
    <div className={cx(styles.divider, { 'border-top': !inline })} />

    {authCheck ?
      <UserMenu
        inline={inline}
        accountMenuIsOpen={accountMenuIsOpen}
        user={user}
      /> : <GuestMenu inline={inline} />}

  </span>
));
