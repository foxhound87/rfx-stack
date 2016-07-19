import React, { Component } from 'react';
import Helmet from 'react-helmet';

const clog = 'https://github.com/foxhound87/mobx-ajv-form/blob/master/CHANGELOG.md';
const doc = 'https://github.com/foxhound87/mobx-ajv-form/blob/master/DOCUMENTATION.md';

export default class NotFound extends Component {

  static fetchData() {}

  render() {
    return (
      <div>
        <Helmet title="MatchMedia + MobX" />
        <div className="mx4">
          <br />
          <br />
          <h1>MobX Ajv Form</h1>
          <h4>Easly manage Forms with MobX and automatic validation with AJV json-schema rules.</h4>
          <p>
            See the <a href={clog}>Changelog
            </a> or the <a href={doc}>Documentation
            </a> for all the details.
          </p>
          <p className="mt3">
            <a href="https://github.com/foxhound87/mobx-ajv-form">
              <i className="h1 mr1 fa fa-github" /> <b>foxhound87/mobx-ajv-form</b>
            </a>
          </p>
          <p className="mt3">
            <a href="https://www.npmjs.com/package/mobx-ajv-form">
              <i className="h1 mr1 fa fa-archive" /> <b>package/mobx-ajv-form</b>
            </a>
          </p>
          <p className="mt3">
            <a href="http://www.webpackbin.com/E1khFEBrZ">
              <i className="h1 mr1 fa fa-cogs" /> <b>webpackbin.com/E1khFEBrZ</b>
            </a>
          </p>
        </div>
      </div>
    );
  }
}
