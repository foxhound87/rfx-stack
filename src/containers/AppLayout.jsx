import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// dev tools
import isDev from 'isdev';
import DevTools from 'mobx-react-devtools';

// components
import { StickyContainer, Sticky } from 'react-sticky';
import AppBar from '../components/AppBar';
import AppNav from '../components/AppNav';

// global styles
import '../styles/_global.css';

// module styles
import styles from '../styles/app.layout.mdl.css';

@connect
export default class AppLayout extends Component {

  static propTypes = {
    children: React.PropTypes.object,
  };

  render() {
    const appNavIsOpen = this.context.store.ui.appNavIsOpen;
    return (
      <StickyContainer className={cx('animated', 'fadeIn')}>
        <AppNav open={appNavIsOpen}>
          <a>Link A</a>
          <a>Link B</a>
          <a>Link C</a>
          <a>Link D</a>
          <a>Link E</a>
        </AppNav>
        { isDev ? <DevTools /> : null }
        <div className={styles.layout}>
          <Sticky className={cx('animated', 'slideInDown')}>
            <AppBar />
          </Sticky>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </StickyContainer>
    );
  }
}
