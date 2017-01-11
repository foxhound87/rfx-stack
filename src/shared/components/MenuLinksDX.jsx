/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import { observer } from 'mobx-react';
import { dispatch } from 'rfx-core';
import cx from 'classnames';
import $ from '@/shared/styles/_.mixins';
import styles from '@/shared/styles/MenuLinkDX.css';

const list = cx('list', 'br2', 'tl', 'pa0');
const inlineList = cx('mt1', 'mr3');
const blockList = cx();
const menuAccount = cx('absolute', 'right-0');
const btnBlock = cx('db', 'ph3', 'pv3', 'tc');
const btnInline = cx('dib', 'ph3', 'pv3');
const baseBtn = cx('pointer');
const authInlineBtn = cx($.buttonGeneric, 'mh2', 'mv1', 'mb2');

const handleMenuAccountToggle = (e) => {
  e.preventDefault();
  dispatch('ui.appBar.toggleAccountMenu');
};

const handleAuthModalSignin = (e) => {
  e.preventDefault();
  dispatch('ui.auth.toggleModal', 'open', 'signin');
};

const handleAuthModalSignup = (e) => {
  e.preventDefault();
  dispatch('ui.auth.toggleModal', 'open', 'signup');
};

const handleLogout = (e) => {
  e.preventDefault();
  dispatch('auth.logout');
};

const Avatar = observer(() => (
  <div className="tc pa4">
    <img
      src=""
      alt=""
      className="br-100 pa1 ba b--black-10 h3 w3"
    />
  </div>
));

const UserSubMenu = observer(({ inline }) => (
  <ul className={cx(list, inline ? inlineList : blockList)}>
    <li>
      <a className={cx(baseBtn, btnBlock)} key="profile">
        <i className="fa fa-user" /> Profile
      </a>
    </li>
    <li>
      <a className={cx(baseBtn, btnBlock)} key="settings">
        <i className="fa fa-sliders" /> Settings
      </a>
    </li>
    <li>
      <a className={cx(baseBtn, btnBlock)} key="signout" onClick={handleLogout}>
        <i className="fa fa-sign-out" /> Sign Out
      </a>
    </li>
  </ul>
));

const BlockSubMenu = observer(({ inline }) => (
  <div>
    <div className={cx('bt', styles.divider)} />
    <UserSubMenu inline={inline} />
  </div>
));

const InlineSubMenu = observer(({ inline, accountMenuIsOpen }) => (
  <div
    className={cx(
      [styles.menuAccount, menuAccount],
      { dn: !accountMenuIsOpen },
    )}
  >
    <UserSubMenu inline={inline} />
  </div>
));

const UserMenu = observer(({ inline, user, accountMenuIsOpen }) => (
  <span className="relative">
    <a
      onClick={inline && handleMenuAccountToggle}
      className={cx(baseBtn, inline ? btnInline : btnBlock)}
    >
      {user.email} {inline && <i className="fa fa-caret-down" />}
    </a>
    {inline ?
      <InlineSubMenu
        inline={inline}
        accountMenuIsOpen={accountMenuIsOpen}
      /> : <BlockSubMenu inline={inline} />}
  </span>
));

const GuestMenu = observer(({ inline }) => (
  <span className="dn di-l">
    <a
      onClick={handleAuthModalSignin}
      className={cx(baseBtn, {
        [authInlineBtn]: inline,
        [styles.loginBtn]: inline,
        ['dib']: inline,
        ['db']: !inline,
      })}
    >
      <i className="fa fa-sign-in" /> Login
    </a>
    <a
      onClick={handleAuthModalSignup}
      className={cx(baseBtn, {
        [authInlineBtn]: inline,
        [styles.registerBtn]: inline,
        ['dib']: inline,
        ['db']: !inline,
      })}
    >
      Register
    </a>
  </span>
));

export default observer(({ user, inline, authCheck, accountMenuIsOpen }) => (
  <span>
    {(authCheck && !inline) && <Avatar />}

    {authCheck ?
      <UserMenu
        inline={inline}
        accountMenuIsOpen={accountMenuIsOpen}
        user={user}
      /> : <GuestMenu inline={inline} />}

    <div className={cx(styles.divider, { bt: !inline })} />
  </span>
));
