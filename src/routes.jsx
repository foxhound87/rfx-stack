import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import AppLayout from './containers/AppLayout';
import Home from './containers/Home';
import Test from './containers/Test';
import NotFound from './containers/NotFound';

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={Home} />
    <Route path="test" component={Test} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
