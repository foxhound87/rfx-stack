import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import { ContextProvider } from './state/context';
import { setMatchMediaConfig } from './utils/matchMedia';
import { fetchDataOnLocationMatch } from './utils/fetch';
import { rehydrate } from './state/hydrate';
import routes from './routes';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

// const context = rehydrate();

const context = {
  store: rehydrate(),
  insertCss: (styles) => styles._insertCss(),
};

// console.log(context);
// console.log(rehydrate());

context.store.ui.injectTapEv(); // material-ui fix
setMatchMediaConfig();
fetchDataOnLocationMatch(browserHistory, routes, match, context);

render(
  <MuiThemeProvider muiTheme={context.store.ui.getMui()}>
    <ContextProvider context={context}>
      <Router routes={routes} history={browserHistory} />
    </ContextProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
