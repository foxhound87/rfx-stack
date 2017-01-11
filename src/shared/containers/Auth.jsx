import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Helmet from 'react-helmet';

import AuthForm from '@/shared/components/AuthForm';

// forms
import authForm from '@/shared/forms/auth';
import userForm from '@/shared/forms/user';

@inject('store') @observer
export default class Auth extends Component {

  static fetchData() {}

  static propTypes = {
    store: React.PropTypes.object,
  };

  render() {
    const { ui } = this.props.store;

    return (
      <div className="pt5 mh5">
        <Helmet title="Auth" />
        <h1>Not Authorized</h1>
        <h2>You are not authorized to access.</h2>
        <AuthForm
          showSection={ui.auth.showSection}
          forms={{
            login     : authForm,
            register  : userForm,
          }}
        />
      </div>
    );
  }
}
