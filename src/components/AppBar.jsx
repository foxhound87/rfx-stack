import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// components
import { Link } from 'react-router';

// styles
import styles from '../styles/app.bar.css';
const button = cx('btn', 'py2', 'm0');
const ul = cx('h5', 'list-reset', 'mb0');
const ulBtn = cx('btn', 'block');

@connect
export default class AppBar extends Component {

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
          <a onClick={this.handleNavToggle} className={button}>Toggle Nav</a>
          <Link to="/" className={button}>Home</Link>
          <Link to="/matchmedia" className="btn" className={button}>MatchMedia</Link>
          <Link to="/test" className="btn" className={button}>Test</Link>
        </div>
        <div className={cx('right')}>
          <div className={cx('inline-block')}>
            <div className={cx('relative')}>
              <a
                onClick={this.handleMenuAccountToggle}
                className={button}
              >
                My Account &#9662;
              </a>
              <div className=
                {cx([styles.menuAccount, 'absolute', 'right-0', 'nowrap', 'rounded'], {
                  hide: !menuAccountIsOpen,
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
  }
}
