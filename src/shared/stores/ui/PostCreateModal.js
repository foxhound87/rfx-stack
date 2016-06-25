import { observable, action } from 'mobx';
import { dispatch } from '~/src/shared/state/dispatcher';
import Form from 'mobx-ajv-form';

export default class PostCreateModal {

  @observable isOpen = false;

  form = null;

  constructor(data) {
    action(() => Object.assign(this, data));
  }

  @action
  toggle(flag = null, section = null) {
    if (!flag) this.isOpen = !this.isOpen;
    if (flag === 'open') this.isOpen = true;
    if (flag === 'close') this.isOpen = false;
    if (section) this.toggleSection(section);
  }

  setupForm() {
    this.form = new Form({
      title: {
        value: '',
      },
      completed: {
        value: true,
      },
    });
  }

  savePostOrShowError() {
    if (!this.form.validate()) return;

    dispatch('post.create', this.form.values())
      .then(() => dispatch('ui.postCreateModal.toggle', 'close'))
      .then(() => dispatch('ui.snackBar.open', 'Post Created.'))
      .then(() => this.form.clear())
      .catch((data) => this.form.invalidate(data.message));
  }
}
