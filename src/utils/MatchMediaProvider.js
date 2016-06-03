import _ from 'lodash';
import React, { Component } from 'react';
import { matchMedia, setMatchMediaConfig } from './matchMedia';
import { toJS, isObservable, observable, action } from 'mobx';
import jsonStringifySafe from 'json-stringify-safe';

export class MatchMediaProvider extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    breakpoints: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.breakpoints = isObservable(this.props.breakpoints)
      ? this.props.breakpoints
      : observable(this.props.breakpoints);

    this.templates = JSON.parse(jsonStringifySafe(toJS(this.breakpoints, true)));
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.matchBreakpoint();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = (e) => {
    e.preventDefault();
    this.matchBreakpoint();
  };

  matchBreakpoint = () => {
    setMatchMediaConfig();
    _.mapKeys(this.templates, this.updateBreakpoints);
  };

  updateBreakpoints = action((val, key) => {
    const match = matchMedia(val).matches;
    this.breakpoints[key] = match;
  });

  render() {
    return (
      <div>{ this.props && this.props.children }</div>
    );
  }
}
