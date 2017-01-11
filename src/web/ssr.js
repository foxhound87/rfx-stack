/* eslint react/jsx-filename-extension: [1, { "extensions": [".js", ".jsx"] }] */
import isDev from 'isdev';
import React from 'react';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'mobx-react';
import { setMatchMediaConfig } from 'mobx-react-matchmedia';
import { fetchData, dehydrate } from 'rfx-core';
import stores from '@/shared/stores';
import bootstrap from './bootstrap';

export default (req, res, props) => {
  const cookieName = 'ssrToken';

  const store = stores.inject({
    app: { ssrLocation: req.url },
    auth: { jwt: req.cookies[cookieName], cookieName },
    ui: { mui: { userAgent: req.headers['user-agent'] } },
  });

  Promise.all(bootstrap(store))
    .then(() => fetchData(store, props)
      .then(() => setMatchMediaConfig(req))
      .then(() => renderToString(
        <MuiThemeProvider muiTheme={store.ui.getMui()}>
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        </MuiThemeProvider>,
      ))
      .then(html => res
        .status(200)
        .render('index', {
          build: isDev ? null : '/build',
          head: Helmet.rewind(),
          state: dehydrate(),
          root: html,
        })));
};
