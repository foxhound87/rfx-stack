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
import stores from '~/src/shared/stores';

export default (req, res, props) => {
  const store = stores.inject({
    app: { ssrLocation: req.url },
    ui: { mui: { userAgent: req.headers['user-agent'] } },
  });

  fetchData(store, props.components, props.params, props.location.query)
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
      }));
};
