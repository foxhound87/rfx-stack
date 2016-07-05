import React, { Component } from 'react';
import { Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import context from '~/src/shared/context';

const ContextProvider = context.getProvider();

export default
class App extends Component {

  static propTypes = {
    store: React.PropTypes.object,
    routes: React.PropTypes.object,
    history: React.PropTypes.object,
  };

  static fetchData() {}

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.store.ui.getMui()}>
        <ContextProvider context={{ store: this.props.store }}>
          <Router routes={this.props.routes} history={this.props.history} />
        </ContextProvider>
      </MuiThemeProvider>
    );
  }
}
