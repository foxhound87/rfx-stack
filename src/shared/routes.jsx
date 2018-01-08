import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import AppLayout from './containers/AppLayout';
import NotFound from './containers/NotFound';

function $import(location, cb, component) {
  return System.import(
    /* webpackChunkName: '[request]' */ `./containers/${component}`,
  )
    .then(module => cb(null, module.default))
    .catch(err => console.error('Dynamic page loading failed', err)); // eslint-disable-line
}

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute getComponent={(loc, cb) => $import(loc, cb, 'Home')} />

    <Route path="auth" getComponent={(loc, cb) => $import(loc, cb, 'Auth')} />

    <Route path="messages">
      <IndexRoute getComponent={(loc, cb) => $import(loc, cb, 'Messages')} />
      <Route
        path="(:messageId)"
        getComponent={(loc, cb) => $import(loc, cb, 'Message')}
      />
    </Route>

    <Route
      path="packages"
      getComponent={(loc, cb) => $import(loc, cb, 'Packages')}
    />

    <Route path="*" component={NotFound} status={404} />
  </Route>
);
