import isDev from 'isdev';
import path from 'path';
import routes from '~/src/routes';
import { Dir } from '~/src/config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { ContextProvider } from '~/src/state/context';
import { dehydrate } from '~/src/state/hydrate';
import { fetchData } from '~/src/utils/fetch';
import { log } from '../logger';
import initStore from '~/src/state';

function handleRouter(req, res, props) {
  log.info('handleRouter');
  const index = path.join(Dir.src, 'index');

  const store = initStore({
    app: { ssrLocation: req.url },
    ui: { mui: { userAgent: req.headers['user-agent'] } },
  });

  fetchData(store, props.components, props.params, props.location.query)
    .then(() => renderToString(
      <ContextProvider context={{ store }}>
        <RouterContext {...props} />
      </ContextProvider>
    ))
    .then((html) => res
      .status(200)
      .render(index, {
        title: 'Title',
        build: isDev ? null : '/build',
        root: html,
        state: dehydrate(store),
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
