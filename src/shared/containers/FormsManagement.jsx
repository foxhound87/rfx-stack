import React, { Component } from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';

// styles
const button = cx(['btn', 'rounded', 'btn-outline']);

// links
const clog = 'https://github.com/foxhound87/mobx-react-form/blob/master/CHANGELOG.md';
const doc = 'https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md';

export default class NotFound extends Component {

  static fetchData() {}

  render() {
    return (
      <div>
        <Helmet title="MobX Ajv Form" />
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
          <br />
          <p>
            <a
              className={cx(button)}
              href="https://github.com/foxhound87/mobx-react-form"
            >
              <i className="fa fa-github" /> <b>foxhound87/mobx-react-form</b>
            </a>
          </p>
          <p>
            <a
              className={cx(button)}
              href="https://www.npmjs.com/package/mobx-react-form"
            >
              <i className="fa fa-archive" /> <b>package/mobx-react-form</b>
            </a>
          </p>
        </div>
      </div>
    );
  }
}
