import path from 'path';
import isDev from 'isdev';
import routes from '~/src/routes';
import { Dir } from '~/config';
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fetchData } from '~/src/utils/fetch';
import { setMatchMediaConfig } from '~/src/utils/matchMedia';
import { ContextProvider } from '~/src/state/context';
import { dehydrate } from '~/src/state/hydrate';
import { log } from '../logger';
import initStore from '~/src/state/store';

function handleRouter(req, res, props) {
  log.info('handleRouter');
  const index = path.join(Dir.src, 'index');

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
      .render(index, {
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
