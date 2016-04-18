import React from 'react';
import { render } from 'react-dom';
import { rehydrate } from './state/hydrate';
import { Router, browserHistory, match } from 'react-router';
import { ContextProvider } from './state/context';
import { fetchDataOnLocationMatch } from './utils/fetch';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = rehydrate();

store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

render(
  <MuiThemeProvider muiTheme={store.ui.getMui()}>
    <ContextProvider context={{ store }}>
      <Router routes={routes} history={browserHistory} />
    </ContextProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
