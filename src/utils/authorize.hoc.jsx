import React, { Component } from 'react';
import { observer } from 'mobx-react';

/**
  Require Auth HOC
 */
export const authorize = ComposedComponent =>
  observer(class Auth extends Component {

    static propTypes = {
      store: React.PropTypes.object,
      router: React.PropTypes.object,
      location: React.PropTypes.object,
    };

    static fetchData(data) {
      if (!data.store.auth.check) {
        return new Promise(resolve => resolve());
      }

      return ComposedComponent.fetchData(data);
    }

    componentWillMount() {
      const { store, location, router } = this.props;

      if (global.TYPE === 'CLIENT') {
        if (!store.auth.check) {
          const currentPath = location.pathname;
          store.auth.redirect = currentPath;
          router.push('/auth');
        }
      }
    }

    render() {
      return (
        this.props.store.auth.check &&
          <ComposedComponent {...this.props} />
      );
    }
  });

