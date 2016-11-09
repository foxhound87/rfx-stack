import React, { Component } from 'react';
import { Router } from 'react-router';
import { Provider } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {

  static propTypes = {
    store: React.PropTypes.object,
    routes: React.PropTypes.object,
    history: React.PropTypes.object,
  };

  static fetchData() {}

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.store.ui.getMui()}>
        <Provider store={this.props.store}>
          <Router routes={this.props.routes} history={this.props.history} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
