import MobxReactForm from 'mobx-react-form';
import { dispatch } from 'rfx-core';

export default class Form extends MobxReactForm {

  onError() {
    dispatch('ui.snackBar.open', 'Incomplete Data');
  }
}
