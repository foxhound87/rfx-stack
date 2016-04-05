import _ from 'lodash';
import React, { Component } from 'react';
import matchMediaMock from 'match-media-mock';
import { toJSON } from 'mobx';
import jsonStringifySafe from 'json-stringify-safe';

const matchMedia = matchMediaMock.create();

let config = null;

export function setMatchMediaConfig(req = null) {
  if (!global.CLIENT && req) {
    config = {
      type: 'screen',
      width: req.params.width,
      height: req.params.height,
    };
  }

  if (global.CLIENT && !req) {
    config = {
      type: 'screen',
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  if (config) matchMedia.setConfig(config);
}

export default class MatchMediaProvider extends Component {

  static propTypes = {
    context: React.PropTypes.object,
    children: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.breakpoints = this.props.context.store.ui.breakpoints;
    this.templates = JSON.parse(jsonStringifySafe(toJSON(this.breakpoints, true)));
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
  }

  matchBreakpoint = () => {
    setMatchMediaConfig();
    _.mapKeys(this.templates, this.updateBreakpoints);
  }

  updateBreakpoints = (val, key) => {
    const match = matchMedia(val).matches;
    this.breakpoints[key] = match;
  }

  render() {
    return this.props && this.props.children;
  }
}

export { matchMedia, MatchMediaProvider };
