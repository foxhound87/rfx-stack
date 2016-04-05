import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// components
import LeftNav from 'material-ui/lib/left-nav';

// styles
import styles from '../styles/app.nav.css';

@connect
export default class AppNav extends Component {

  static propTypes = {
    children: React.PropTypes.array,
    open: React.PropTypes.bool,
    docked: React.PropTypes.bool,
    onRequestChange: React.PropTypes.func,
  };

  render() {
    return (
      <LeftNav
        className={cx(styles.nav)}
        open={this.props.open}
        docked={this.props.docked}
        onRequestChange={this.props.onRequestChange}
      >
        {this.props.children}
      </LeftNav>
    );
  }
}
