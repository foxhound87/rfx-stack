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

// events
const handleNavToggle = (e) => {
  e.preventDefault();
  dispatch('ui.toggleAppNav');
};

const handleMenuAccountToggle = (e) => {
  e.preventDefault();
  dispatch('ui.toggleAppBarMenuAccount');
};

const AppBar = ({ open }) => (
  <div className={cx(styles.bar, 'clearfix')}>
    <div className="left">
      <a onClick={handleNavToggle} className={button}>Toggle Nav</a>
      <Link to="/" className={button}>Home</Link>
      <Link to="/matchmedia" className="btn" className={button}>MatchMedia</Link>
      <Link to="/test" className="btn" className={button}>Test</Link>
    </div>
    <div className={cx('right')}>
      <div className={cx('inline-block')}>
        <div className={cx('relative')}>
          <a
            onClick={handleMenuAccountToggle}
            className={button}
          >
            My Account &#9662;
          </a>
          <div className=
            {cx([styles.menuAccount, 'absolute', 'right-0', 'nowrap', 'rounded'], {
              hide: !open,
            })}
          >
            <ul className={ul}>
              <li><a className={ulBtn}>Profile</a></li>
              <li><a className={ulBtn}>Settings</a></li>
              <li><a className={ulBtn}>Sign Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className={cx('clearfix', 'sm-hide')}></div>
    <div className={cx('overflow-hidden', 'px2')}>
    </div>
  </div>
);

AppBar.propTypes = {
  uiStore: React.PropTypes.object,
  open: React.PropTypes.bool,
};

export default connect(AppBar);
