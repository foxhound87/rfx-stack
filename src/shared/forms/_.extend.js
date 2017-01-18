import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { observable, action, computed } from 'mobx';
import { dispatch } from 'rfx-core';
import bindings from './_.bindings';

/**
  What can I do with mobx-react-form ?

  API: https://foxhound87.github.io/mobx-react-form/docs/api-reference/
  FIELDS: https://foxhound87.github.io/mobx-react-form/docs/defining-fields.html
  ACTIONS: https://foxhound87.github.io/mobx-react-form/docs/actions/
  EVENTS: https://foxhound87.github.io/mobx-react-form/docs/events/
  VALIDATION: https://foxhound87.github.io/mobx-react-form/docs/validation/
  BINDINGS: https://foxhound87.github.io/mobx-react-form/docs/bindings/
*/

export default class Form extends MobxReactForm {

  @observable $loading = false;

  plugins() {
    return {
      dvr: validatorjs,
    };
  }

  bindings() {
    return bindings;
  }

  @computed get loading() {
    return this.$loading;
  }

  onInit() {
    this.forEach(field =>
      field.set('bindings', 'MaterialTextField'));
  }

  onError(form) {
    action(() => (form.$loading = false))(); // eslint-disable-line
    dispatch('ui.snackBar.open', 'Incomplete Data');
  }

  handleSubmit = (e) => {
    action(() => (this.$loading = true))();
    this.onSubmit(e);
  };
}
