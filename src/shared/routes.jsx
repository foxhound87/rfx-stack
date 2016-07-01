import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import AppLayout from './containers/AppLayout';
import NotFound from './containers/NotFound';
import Home from './containers/Home';
import Messages from './containers/Messages';
import Breakpoints from './containers/Breakpoints';
import FormsManagement from './containers/FormsManagement';

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={Home} />
    <Route path="messages" component={Messages} />
    <Route path="breakpoints" component={Breakpoints} />
    <Route path="forms" component={FormsManagement} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
