import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import materialOverrideStyles from '~/src/shared/styles/_.material.js';
import _ from 'lodash';

export default class Material {

  mui = {};

  getMui() {
    const mui = (global.TYPE === 'CLIENT')
      ? { userAgent: navigator.userAgent }
      : {};

    return getMuiTheme(this.mui, _.merge(
      mui,
      darkBaseTheme,
      materialOverrideStyles,
    ));
  }
}
