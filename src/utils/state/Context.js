import { PropTypes } from 'react';
import ContextProvider from './ContextProvider';

export default class Context {

  types = null;
  provider = null;

  constructor(types) {
    this.setTypes(types);
    this.setProvider(types);
  }

  initProvider(types) {
    Object.assign(ContextProvider, { childContextTypes: types });
    Object.assign(ContextProvider.propTypes, {
      context: PropTypes.shape(types),
    });
    Object.assign(ContextProvider.prototype, {
      getChildContext() {
        return this.props.context;
      },
    });
    return ContextProvider;
  }

  setProvider(types) {
    this.provider = this.initProvider(types);
    return this;
  }

  getProvider() {
    return this.provider;
  }

  setTypes(types) {
    this.types = types;
    return this;
  }

  getTypes() {
    return this.types;
  }
}
