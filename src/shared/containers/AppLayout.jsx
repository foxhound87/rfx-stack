import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

// dev tools
import isDev from 'isdev';
import DevTools from 'mobx-react-devtools';

// components
import { MatchMediaProvider } from 'mobx-react-matchmedia';
import Snackbar from 'material-ui/Snackbar';
import AppBar from '@/shared/components/AppBar';
import AppNav from '@/shared/components/AppNav';
import AuthModal from '@/shared/components/AuthModal';
import MenuLinksSX from '@/shared/components/MenuLinksSX';
import MenuLinksDX from '@/shared/components/MenuLinksDX';

// forms
import authForm from '@/shared/forms/auth';
import userForm from '@/shared/forms/user';

// styles
import '@/shared/styles/_.global.css';
import styles from '@/shared/styles/AppLayout.css';

@inject('store') @observer
export default class AppLayout extends Component {

  static fetchData() { }

  static propTypes = {
    children: React.PropTypes.node,
    store: React.PropTypes.object,
  };

  render() {
    const { ui, auth } = this.props.store;

    return (
      <MatchMediaProvider breakpoints={ui.breakpoints}>
        <div className="helvetica">
          {isDev ? <DevTools position={{ bottom: 0, right: '20px' }} /> : null}
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            titleTemplate="RFX Stack - %s"
            defaultTitle="Default Title"
          />
          <AppNav
            open={ui.appNav.isOpen}
            docked={ui.appNav.isDocked}
            authCheck={auth.check}
            accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
          >
            <MenuLinksDX
              user={auth.user}
              authCheck={auth.check}
              accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
            />
            <MenuLinksSX />
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
            open={ui.auth.modalIsOpen}
            showSection={ui.auth.showSection}
            forms={{
              login     : authForm,
              register  : userForm,
            }}
          />
        </div>
      </MatchMediaProvider>
    );
  }
}
