import React from 'react';
import { connect, dispatch } from '~/src/utils/state';
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

const MenuLinksDX = ({ user, inline, authCheck, accountMenuIsOpen }) => (
  <span>
    <div className={cx(styles.divider, { 'border-top': !inline })} />
    <If condition={authCheck}>
      <span>
        <a
          onClick={inline && handleMenuAccountToggle}
          className={inline ? btnInline : btnBlock}
        >
          {user.email} {inline && <i className="fa fa-caret-down" />}
        </a>
        <If condition={inline}>
          <div
            className={cx(
              [styles.menuAccount, menuAccount],
              { hide: !accountMenuIsOpen }
            )}
          >
            <UserSubMenu />
          </div>
          <Else />
          <div className={cx(styles.divider, { 'border-top': !inline })} />
          <UserSubMenu />
        </If>
      </span>
      <Else />
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
    </If>
  </span>
);

MenuLinksDX.propTypes = {
  user: React.PropTypes.object,
  inline: React.PropTypes.bool,
  authCheck: React.PropTypes.bool,
  accountMenuIsOpen: React.PropTypes.bool,
};

export default connect(MenuLinksDX);
