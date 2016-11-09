import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';

import cx from 'classnames';

// dev tools
import isDev from 'isdev';
import DevTools from 'mobx-react-devtools';

// components
import { MatchMediaProvider } from 'mobx-react-matchmedia';
import Snackbar from 'material-ui/Snackbar';
import AppBar from '../components/AppBar';
import AppNav from '../components/AppNav';
import AuthModal from '../components/AuthModal';
import MenuLinksSX from '../components/MenuLinksSX';
import MenuLinksDX from '../components/MenuLinksDX';

// forms
import authForm from '../forms/auth';
import userForm from '../forms/user';

// global styles
import '../styles/_.global.css';

// module styles
import styles from '../styles/app.layout.css';

@observer(['store'])
export default class AppLayout extends Component {

  static fetchData() {}

  static propTypes = {
    store: React.PropTypes.object,
    children: React.PropTypes.node,
    // location: React.PropTypes.object,
    // params: React.PropTypes.object,
    // routeParams: React.PropTypes.object,
    // route: React.PropTypes.object,
    // routes: React.PropTypes.array,
  };

  render() {
    const { ui, auth } = this.props.store;
    // const { location, params, routeParams, route, routes } = this.props;

    return (
      <MatchMediaProvider breakpoints={ui.breakpoints}>
        {isDev ? <DevTools position={{ bottom: 0, right: '20px' }} /> : null}
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          titleTemplate="RFX Stack - %s"
          defaultTitle="Default Title"
        />
        <AppNav
          open={ui.appNav.isOpen}
          docked={ui.appNav.isDocked}
          accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
        >
          <MenuLinksSX />
          <MenuLinksDX
            user={auth.user}
            authCheck={auth.check}
            accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
          />
        </AppNav>
        <div className={cx({ [styles.su]: ui.layoutIsShifted })}>
          <AppBar
            accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
            layoutIsShifted={ui.layoutIsShifted}
            authCheck={auth.check}
            user={auth.user}
          />
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
        <Snackbar
          open={ui.snackBar.isOpen}
          message={ui.snackBar.message}
          autoHideDuration={ui.snackBar.duration}
          onRequestClose={() => ui.snackBar.close()}
        />
        <AuthModal
          open={ui.authModal.isOpen}
          showSection={ui.authModal.showSection}
          forms={{
            login     : authForm,
            register  : userForm,
          }}
        />
      </MatchMediaProvider>
    );
  }
}
