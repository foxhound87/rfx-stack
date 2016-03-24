import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';
import styles from '../styles/app.bar.mdl.css';

// components
import { Link } from 'react-router';

@connect
export default class AppNav extends Component {

  static propTypes = {
    open: React.PropTypes.bool,
  };

  handleNavToggle = (e) => {
    e.preventDefault();
    this.context.store.ui.toggleAppNav();
  };

  handleMenuAccountToggle = (e) => {
    e.preventDefault();
    this.context.store.ui.toggleAppBarMenuAccount();
  };

  render() {
    const uiStore = this.context.store.ui;
    const menuAccountIsOpen = uiStore.appBarMenuAccountIsOpen;
    return (
      <div className={cx(styles.bar, 'clearfix')}>
        <div className="left">
          <a onClick={this.handleNavToggle} className={styles.btn}>Toggle Nav</a>
          <Link to="/" className={styles.btn}>Home</Link>
          <Link to="/test" className="btn" className={styles.btn}>Test</Link>
        </div>
        <div className={cx('right')}>
          <div className={cx('inline-block')}>
            <div className={cx('relative')}>
              <a
                onClick={this.handleMenuAccountToggle}
                className={styles.btn}
              >
                My Account &#9662;
              </a>
              <div className=
                {cx([styles.menuAccount, 'absolute', 'right-0', 'nowrap', 'rounded'], {
                  hide: !menuAccountIsOpen,
                })}
              >
                <ul>
                  <li><a className={styles.btn}>Profile</a></li>
                  <li><a className={styles.btn}>Settings</a></li>
                  <li><a className={styles.btn}>Sign Out</a></li>
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
  }
}
