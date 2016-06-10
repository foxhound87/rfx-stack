import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { fetchDataOnLocationMatch } from '../utils/fetch';
import { rehydrate, hotRehydrate } from '~/src/shared/state/hydrate';
import initStore from '../shared/stores';
import routes from '../shared/routes';
import App from './App';

const store = rehydrate(initStore);
// store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

function renderApp(AppComponent) {
  render(
    <AppContainer>
      <AppComponent
        store={hotRehydrate()}
        routes={routes}
        history={browserHistory}
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
