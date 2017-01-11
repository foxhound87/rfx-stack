import { observable, computed, action, reaction } from 'mobx';
import { app, service } from '@/shared/app';
import { verifyJWT } from '@/utils/jwt';
import { browserHistory } from 'react-router';
import cookie from 'js-cookie';
import _ from 'lodash';

export default class AuthStore {

  cookieName = 'ssrToken';

  redirect = '/';

  jwt = null;

  @observable user = {};

  init() {
    this.authenticate();
    this.loadAuthPageOnLogout();
  }

  authenticate() {
    if (global.TYPE === 'CLIENT') return this.authOnClient();
    if (global.TYPE === 'SERVER') return this.authOnServer();
    return null;
  }

  /**
    Authorize on Server Side
    authenticate on bootstrap
  */
  authOnServer() {
    // authorize apis on server side
    if (this.jwt) return this.jwtAuth({ token: this.jwt });
    // force logout on api server
    return this.logout();
  }

  /**
    Authorize on Client Side
    authenticate on init
  */
  authOnClient() {
    // run cookie auth only on client side
    const token = cookie.get(this.cookieName);
    // force logout if token not present
    if (!token) return this.logout();
    // token present - authenticate
    return this.jwtAuth({ token });
  }

  /**
    Check Auth (if user is logged)
  */
  @computed get check() {
    return !_.isEmpty(this.user);
  }

  @action
  updateUser(data = null) {
    this.user = data || {};
  }

  sessionAuth() {
    return app()
      .authenticate()
      .then(response => verifyJWT(response.accessToken))
      .then(data => this.setCookie(data))
      .then(payload => service('user').get(payload.userId))
      .then(user => this.updateUser(user));
  }

  jwtAuth({ token }) {
    return app()
      .authenticate({ strategy: 'jwt', accessToken: token })
      .then(response => verifyJWT(response.accessToken))
      .then(data => this.setCookie(data))
      .then(payload => service('user').get(payload.userId))
      .then(user => this.updateUser(user));
  }

  @action
  login({ email, password }) {
    return app()
      .authenticate({ strategy: 'local', email, password })
      .then(response => verifyJWT(response.accessToken))
      .then(data => this.setCookie(data))
      .then(payload => service('user').get(payload.userId))
      .then(user => this.updateUser(user))
      .then(user => this.redirectAfterLogin(user));
  }

  @action
  register({ email, password, username }) {
    return service('user')
      .create({ email, password, username });
  }

  setCookie({ token, payload }) {
    this.jwt = token;
    cookie.set(this.cookieName, token);
    return payload;
  }

  unsetCookie() {
    this.jwt = null;
    cookie.remove(this.cookieName);
  }

  @action
  logout() {
    return new Promise((resolve) => {
      app().logout();
      this.unsetCookie();
      this.updateUser({});
      resolve();
    });
  }

  loadAuthPageOnLogout() {
    reaction(() => this.check,
      check => !check && browserHistory.push('/auth'));
  }

  redirectAfterLogin() {
    browserHistory.push(this.redirect);
    this.redirect = '/'; // reset default redirect
  }
}
