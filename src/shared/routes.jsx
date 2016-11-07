import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import AppLayout from './containers/AppLayout';
import NotFound from './containers/NotFound';
import Home from './containers/Home';

function $import(location, cb, component) {
  return System.import('./containers/' + component) // eslint-disable-line
    .then(module => cb(null, module.default))
    .catch(err => console.error('Dynamic page loading failed', err)); // eslint-disable-line
}

export default (
  <Route path="/" component={AppLayout}>

    <IndexRoute component={Home} />

    <Route
      path="messages"
      getComponent={(loc, cb) =>
        $import(loc, cb, 'Messages')}
    />

    <Route
      path="breakpoints"
      getComponent={(loc, cb) =>
        $import(loc, cb, 'Breakpoints')}
    />

    <Route
      path="forms"
      getComponent={(loc, cb) =>
        $import(loc, cb, 'FormsManagement')}
    />

    <Route path="*" component={NotFound} status={404} />

  </Route>
);
