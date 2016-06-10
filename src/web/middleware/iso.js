import isDev from 'isdev';
import React from 'react';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { fetchData } from '~/src/utils/fetch';
import { setMatchMediaConfig } from '~/src/utils/matchMedia';
import { ContextProvider } from '~/src/shared/state/context';
import { dehydrate } from '~/src/shared/state/hydrate';
import initStore from '~/src/shared/stores';
import routes from '~/src/shared/routes';

function handleRouter(req, res, props) {
  console.log('route:', req.url); // eslint-disable-line no-console

  const store = initStore({
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
        state: dehydrate(store),
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
