import React, { Component } from 'react';
import { connect } from '../state/context';
import moment from 'moment';

@connect
export default class TimeAgo extends Component {

  static propTypes = {
    date: React.PropTypes.string,
  };

  // componentDidMount() {
  //   this.state.ticker = setInterval(3000, this.moment);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.ticker);
  // }

  moment() {
    console.log('moment...');
    this.setState({
      time: moment(this.props.date).fromNow(),
    });
  }

  render() {
    return (
      <span>{this.state.time}</span>
    );
  }
}
