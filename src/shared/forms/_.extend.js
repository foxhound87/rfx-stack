import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
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

  plugins() {
    return {
      dvr: validatorjs,
    };
  }

  bindings() {
    return bindings;
  }

  onInit() {
    this.each(field =>
      field.set('bindings', 'MaterialTextField'));
  }
}
