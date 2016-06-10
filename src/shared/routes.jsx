import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import AppLayout from './containers/AppLayout';
import NotFound from './containers/NotFound';
import Home from './containers/Home';
import MatchMedia from './containers/MatchMedia';
import Test from './containers/Test';

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={Home} />
    <Route path="matchmedia" component={MatchMedia} />
    <Route path="test" component={Test} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
