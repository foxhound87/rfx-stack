import isDev from 'isdev';
import React from 'react';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { setMatchMediaConfig } from 'mobx-react-matchmedia';
import { fetchData, dehydrate } from '~/src/utils/state';
import routes from '~/src/shared/routes';
import stores from '~/src/shared/stores';
import context from '~/src/shared/context';

function handleRouter(req, res, props) {
  console.log('route:', req.url); // eslint-disable-line no-console
  if (req.url === '/favicon.ico') return;

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
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search);
}

function handleNotFound(res) {
  res.status(404).send('Not Found');
}

function handleError(res, err) {
  res.status(500).send(err.message);
}

export function isoMiddleware(req, res) {
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err);
      else if (redirect) handleRedirect(res, redirect);
      else if (props) handleRouter(req, res, props);
      else handleNotFound(res);
    });
}
