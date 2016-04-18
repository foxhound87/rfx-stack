import React, { Component } from 'react';
import { connect } from '../state/context';

import cx from 'classnames';

// dev tools
import isDev from 'isdev';
import DevTools from 'mobx-react-devtools';

// components
import { StickyContainer, Sticky } from 'react-sticky';
import { MatchMediaProvider } from '../utils/matchMedia';
import AppBar from '../components/AppBar';
import AppNav from '../components/AppNav';

// global styles
import '../styles/_.global.css';

// module styles
import styles from '../styles/app.layout.css';

const navBtn = cx('btn', 'block');

@connect
export default class AppLayout extends Component {

  static propTypes = {
    children: React.PropTypes.object,
  };

  handleAppNavRequestChange = (open) => {
    this.context.store.ui.appNavIsOpen = open;
  };

  render() {
    const ui = this.context.store.ui;
    const layoutIsShifted = ui.layoutIsShifted;
    const appNavIsOpen = ui.appNavIsOpen;
    const appNavIsDocked = ui.appNavIsDocked;
    const menuAccountIsOpen = ui.appBarMenuAccountIsOpen;

    return (
      <MatchMediaProvider context={this.context}>
        <StickyContainer className={cx('animated', 'fadeIn')}>
          { isDev ? <DevTools /> : null }
          <AppNav
            open={appNavIsOpen}
            docked={appNavIsDocked}
            onRequestChange={this.handleAppNavRequestChange}
          >
            <a className={navBtn}>Link A</a>
            <a className={navBtn}>Link B</a>
            <a className={navBtn}>Link C</a>
            <a className={navBtn}>Link D</a>
            <a className={navBtn}>Link E</a>
          </AppNav>
          <div className={cx({ [styles.su]: layoutIsShifted })}>
            <Sticky className={cx('animated', 'slideInDown')}>
              <AppBar open={menuAccountIsOpen} />
            </Sticky>
            <div className={styles.content}>
              {this.props.children}
            </div>
          </div>
        </StickyContainer>
      </MatchMediaProvider>
    );
  }
}
