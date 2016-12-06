import React, { Component } from 'react';
import Helmet from 'react-helmet';

import $ from '@/shared/styles/_.mixins';

// links
const clog = 'https://github.com/foxhound87/mobx-react-form/blob/master/CHANGELOG.md';
const doc = 'https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md';

export default class FormsManagement extends Component {

  static fetchData() {}

  render() {
    return (
      <div className="pv5">
        <Helmet title="MobX React Form" />
        <div className="ph4">
          <br />
          <br />
          <h1>MobX React Form</h1>
          <h4>Automagically manage React forms state and automatic validation with MobX.</h4>
          <p>
            See the <a href={clog}>Changelog</a>
            or the <a href={doc}>Documentation</a> for all the details.
          </p>
          <br />
          <p>
            <button
              className={$.buttonPill}
              href="https://github.com/foxhound87/mobx-react-form"
            >
              <i className="fa fa-github" /> <b>foxhound87/mobx-react-form</b>
            </button>
          </p>
          <p>
            <button
              className={$.buttonPill}
              href="https://www.npmjs.com/package/mobx-react-form"
            >
              <i className="fa fa-archive" /> <b>package/mobx-react-form</b>
            </button>
          </p>
        </div>
      </div>
    );
  }
}
