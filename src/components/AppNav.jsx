import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';
import styles from '../styles/app.nav.mdl.css';

// components
import LeftNav from 'material-ui/lib/left-nav';

@connect
export default class AppNav extends Component {

  static propTypes = {
    children: React.PropTypes.array,
    open: React.PropTypes.bool,
  };

  render() {
    return (
      <LeftNav open={this.props.open} className={cx(styles.nav)}>
        {this.props.children}
      </LeftNav>
    );
  }
}
