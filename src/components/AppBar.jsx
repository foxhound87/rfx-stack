import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';
import cx from 'classnames';

// components
import { Link } from 'react-router';

// styles
import styles from '../styles/app.bar.css';
const button = cx('btn', 'py2', 'm0');
const ul = cx('h5', 'list-reset', 'mb0');
const ulBtn = cx('btn', 'block');
const menuAccount = cx('absolute', 'right-0', 'nowrap', 'rounded');
const appBar = cx('clearfix', 'fixed', 'animated', 'fadeIn', 'top-0', 'right-0');

// events
const handleNavToggle = (e) => {
  e.preventDefault();
  dispatch('ui.toggleAppNav');
};

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

const AppBar = ({ open, check, user, ui }) => (
  <div className={cx(styles.bar, appBar, {
    [styles.leftShifted]: ui.layoutIsShifted,
    'left-0': !ui.layoutIsShifted,
  })}
  >
    <div className="left">
      <a onClick={handleNavToggle} className={button}>Toggle Nav</a>
      <Link to="/" className={button}>Home</Link>
      <Link to="/matchmedia" className="btn" className={button}>MatchMedia</Link>
      <Link to="/test" className="btn" className={button}>Test</Link>
    </div>
    <div className={cx('right')}>
      <div className={cx('inline-block')}>
        <div className={cx('relative')}>
          <If condition={check}>
            <a onClick={handleMenuAccountToggle} className={button}> {user.email} &#9662;</a>
            <div className={cx([styles.menuAccount, menuAccount], { hide: !open })}>
              <ul className={ul}>
                <li><a className={ulBtn}>Profile</a></li>
                <li><a className={ulBtn}>Settings</a></li>
                <li><a className={ulBtn} onClick={handleLogout}>Sign Out</a></li>
              </ul>
            </div>
          <Else />
            <a onClick={handleAuthModalSignin} className={button}>
              Login
            </a>
            <a onClick={handleAuthModalSignup} className={button}>
              Register
            </a>
          </If>
        </div>
      </div>
    </div>
    <div className={cx('clearfix', 'sm-hide')}></div>
    <div className={cx('overflow-hidden', 'px2')}>
    </div>
  </div>
);

AppBar.propTypes = {
  ui: React.PropTypes.object,
  user: React.PropTypes.object,
  check: React.PropTypes.bool,
  open: React.PropTypes.bool,
};

export default connect(AppBar);
