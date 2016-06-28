import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// dev tools
import isDev from 'isdev';
import DevTools from 'mobx-react-devtools';

// components
import { MatchMediaProvider } from '~/src/utils/MatchMediaProvider';
import Snackbar from 'material-ui/Snackbar';
import AppBar from '../components/AppBar';
import AppNav from '../components/AppNav';
import AuthModal from '../components/AuthModal';

// forms
import authForm from '../forms/auth';
import userForm from '../forms/user';

// global styles
import '../styles/_.global.css';

// module styles
import styles from '../styles/app.layout.css';

function stringify(data) {
  return JSON.stringify(data, undefined, 2);
}

@connect
export default
class AppLayout extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
    params: React.PropTypes.object,
    routeParams: React.PropTypes.object,
    route: React.PropTypes.object,
    routes: React.PropTypes.array,
  };

  handleAppNavRequestChange = (open) => {
    this.context.store.ui.toggleAppNav(open);
  };

  render() {
    const { location, params, routeParams, route, routes } = this.props;
    const { ui, auth } = this.context.store;

    return (
      <MatchMediaProvider breakpoints={ui.breakpoints}>
        { isDev ? <DevTools position={{ bottom: 0, right: '20px' }} /> : null }
        <AppNav
          open={ui.appNavIsOpen}
          docked={ui.appNavIsDocked}
          onRequestChange={this.handleAppNavRequestChange}
        >
          <pre>
            <ul className={cx('list-reset', 'm2')}>
              <li><h3>Auth Store</h3></li>
              <li><b>User</b> {stringify(auth.user)}</li>
              <li><h3>React Router</h3></li>
              <li><b>Location</b> {stringify(location)}</li>
              <li><b>Params</b> {stringify(params)}</li>
              <li><b>Route Params</b> {stringify(routeParams)}</li>
              <li><b>Route</b> {stringify(route)}</li>
              <li><b>Routes</b> {stringify(routes)}</li>
            </ul>
          </pre>
        </AppNav>
        <div className={cx({ [styles.su]: ui.layoutIsShifted })}>
          <AppBar
            open={ui.appBar.accountMenuIsOpen}
            check={auth.check}
            user={auth.user}
            ui={ui}
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
