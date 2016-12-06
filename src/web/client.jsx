/* eslint global-require: 0 */
import '@/shared/stores'; // initialize stores

import {
  rehydrate,
  hotRehydrate,
  fetchDataOnLocationMatch } from 'rfx-core';

import React from 'react';
import { render } from 'react-dom';
import { hashHistory, browserHistory, match } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from '@/shared/routes';
import App from './App';

const store = rehydrate();
const history = global.ELECTRON ? hashHistory : browserHistory;

fetchDataOnLocationMatch(history, routes, match, store);
store.ui.injectTapEventPlugin(); // material-ui fix

function renderApp(AppComponent) {
  match({ history, routes },
    (error, redirect, routerProps) =>
      render(
        <AppContainer>
          <AppComponent
            store={hotRehydrate()}
            routerProps={routerProps}
          />
        </AppContainer>,
        document.getElementById('root'),
      ));
}

renderApp(App);

if (module.hot) {
  module.hot.accept(() =>
    renderApp(require('./App').default));
}
