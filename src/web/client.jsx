/* eslint global-require: 0 */
import React from 'react';
import { render } from 'react-dom';
import { hashHistory, browserHistory, match } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from '../shared/routes';
import App from './App';

import {
  rehydrate,
  hotRehydrate,
  fetchDataOnLocationMatch } from '~/src/utils/state';

import '~/src/shared/stores'; // initialize stores

const store = rehydrate();
const history = global.ELECTRON ? hashHistory : browserHistory;

fetchDataOnLocationMatch(history, routes, match, store);
store.ui.injectTapEventPlugin(); // material-ui fix

function renderApp(AppComponent) {
  render(
    <AppContainer>
      <AppComponent
        store={hotRehydrate()}
        routes={routes}
        history={history}
      />
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept(() =>
    renderApp(require('./App').default));
}
