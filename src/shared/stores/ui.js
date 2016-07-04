import { observable, autorun } from 'mobx';
import { extend, toggle } from '~/src/utils/decorators';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import materialOverrideStyles from '../styles/_.material.js';
import _ from 'lodash';

// ui classes
import AppBar from './ui/AppBar.js';
import AppNav from './ui/AppNav.js';
import SnackBar from './ui/SnackBar.js';
import AuthModal from './ui/AuthModal.js';
import PostCreateModal from './ui/PostCreateModal.js';

@extend({
  appBar: AppBar,
  appNav: AppNav,
  snackBar: SnackBar,
  authModal: AuthModal,
  postCreateModal: PostCreateModal,
})
@toggle('shiftLayout', 'layoutIsShifted')
export default class UIStore {

  mui = {};

  @observable layoutIsShifted = false;

  @observable breakpoints = {
    xs: '(max-width: 767px)',
    su: '(min-width: 768px)',
    sm: '(min-width: 768px) and (max-width: 991px)',
    md: '(min-width: 992px) and (max-width: 1199px)',
    mu: '(min-width: 992px)',
    lg: '(min-width: 1200px)',
  };

  init() {
    // shift the layout on "su" breakpoint when appnav is open
    autorun(() => this.breakpoints.su && this.appNav.isOpen
      ? this.shiftLayout(true)
      : this.shiftLayout(false)
    );

    // undock the navbar if the modal is open
    autorun(() => this.authModal.isOpen
      ? this.appNav.open(false)
      : () => this.breakpoints.mu && this.appNav.open(true)
    );

    /**
      The following autoruns demonstartes how to keep
      the navbar open from the startup and how to close it
      automatically when the browser window is resized
    */

    // // open and close the nav automatically
    // // when the "xs" breakpoint changes
    // autorun(() => this.breakpoints.xs
    //   ? this.appNav.open(false)
    //   : this.appNav.open(true)
    // );

    // // dock/undock the nav automatically
    // // when the "su" breakpoint changes
    // autorun(() => this.breakpoints.su
    //   ? this.appNav.dock(true)
    //   : this.appNav.dock(false)
    // );
  }

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

  injectTapEventPlugin() {
    if (process.env.NODE_ENV === 'development') {
      return console.warn([
        'The react-tap-event-plugin is enabled only in production, ',
        'due to a issue with Hot-Reloadable MobX Stores.',
      ].join(''));
    }
    // Material-UI components use react-tap-event-plugin to listen for touch events
    // This dependency is temporary and will go away once react v1.0
    return injectTapEventPlugin();
  }
}
