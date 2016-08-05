/* eslint react/jsx-filename-extension: [1, { "extensions": [".js", ".jsx"] }] */
import isDev from 'isdev';
import React from 'react';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { setMatchMediaConfig } from 'mobx-react-matchmedia';
import { fetchData, dehydrate } from '~/src/utils/state';
import stores from '~/src/shared/stores';
import context from '~/src/shared/context';

export default (req, res, props) => {
  const ContextProvider = context.getProvider();

  const store = stores.inject({
    app: { ssrLocation: req.url },
    ui: { mui: { userAgent: req.headers['user-agent'] } },
  });

  fetchData(store, props.components, props.params, props.location.query)
    .then(() => setMatchMediaConfig(req))
    .then(() => renderToString(
      <MuiThemeProvider muiTheme={store.ui.getMui()}>
        <ContextProvider context={{ store }}>
          <RouterContext {...props} />
        </ContextProvider>
      </MuiThemeProvider>
    ))
    .then((html) => res
      .status(200)
      .render('index', {
        build: isDev ? null : '/build',
        head: Helmet.rewind(),
        state: dehydrate(),
        root: html,
      }));
};
