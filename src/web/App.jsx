import React, { Component } from 'react';
import { Router } from 'react-router';
import { Provider } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  static propTypes = {
    store: React.PropTypes.object,
    routerProps: React.PropTypes.object,
  };

  static fetchData() {}

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.store.ui.getMui()}>
        <Provider store={this.props.store}>
          <Router {...this.props.routerProps} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
