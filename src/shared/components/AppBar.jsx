import React from 'react';
import cx from 'classnames';
import { connect, dispatch } from '~/src/utils/state';

// components
import MenuLinksSX from '../components/MenuLinksSX';
import MenuLinksDX from '../components/MenuLinksDX';

// styles
import styles from '../styles/app.bar.css';

const button = cx('btn', 'inline-block', 'py2', 'm0');
const appBar = cx('clearfix', 'fixed', 'animated', 'fadeIn', 'top-0', 'right-0');

// events
const handleNavToggle = (e) => {
  e.preventDefault();
  dispatch('ui.appNav.open');
};

const AppBar = ({ authCheck, user, accountMenuIsOpen, layoutIsShifted }) => (
  <div
    className={cx(styles.bar, appBar, {
      [styles.leftShifted]: layoutIsShifted,
      'left-0': !layoutIsShifted,
    })}
  >
    <div className="left lg-hide">
      <button onClick={handleNavToggle} className={button}>
        <i className="fa fa-bars" />
      </button>
    </div>
    <div className="left lg-show">
      <button onClick={handleNavToggle} className={button}>
        <i className="fa fa-bars" />
      </button>
      <MenuLinksSX inline />
    </div>
    <div className="right md-show">
      <div className="inline-block">
        <div className="relative">
          <MenuLinksDX
            inline
            user={user}
            authCheck={authCheck}
            accountMenuIsOpen={accountMenuIsOpen}
          />
        </div>
      </div>
    </div>
    <div className={cx('clearfix', 'sm-hide')} />
    <div className={cx('overflow-hidden', 'px2')} />
  </div>
);

AppBar.propTypes = {
  user: React.PropTypes.object,
  authCheck: React.PropTypes.bool,
  layoutIsShifted: React.PropTypes.bool,
  accountMenuIsOpen: React.PropTypes.bool,
};

export default connect(AppBar);
