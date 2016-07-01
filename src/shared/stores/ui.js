import { observable, autorun, action } from 'mobx';
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

  constructor(ui) {
    action(() => Object.assign(this, ui));

    // Init nested UI instances
    this.appBar = new AppBar(ui.appBar);
    this.appNav = new AppNav(ui.appNav);
    this.snackBar = new SnackBar(ui.snackBar);
    this.authModal = new AuthModal(ui.authModal);
    this.postCreateModal = new PostCreateModal(ui.postCreateModal);

    // shift the layout on "su" breakpoint when appnav is open
    autorun(() => this.breakpoints.su && this.appNav.isOpen
      ? this.shiftLayout('yes')
      : this.shiftLayout('no')
    );

    // undock the navbar if the modal is open
    autorun(() => this.authModal.isOpen
      ? this.appNav.toggle('close')
      : () => this.breakpoints.mu && this.appNav.toggle('open')
    );

    /**
      The following autoruns demonstartes how to keep
      the navbar open from the startup and how to close it
      automatically when the browser windows is resized
    */

    // // open and close the nav automatically
    // // when the "xs" breakpoint changes
    // autorun(() => this.breakpoints.xs
    //   ? this.appNav.toggle('close')
    //   : this.appNav.toggle('open')
    // );

    // // dock/undock the nav automatically
    // // when the "su" breakpoint changes
    // autorun(() => this.breakpoints.su
    //   ? this.appNav.dock('on')
    //   : this.appNav.dock('off')
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

  @action
  shiftLayout(flag = null) {
    if (flag === 'yes') this.layoutIsShifted = true;
    if (flag === 'no') this.layoutIsShifted = false;
  }
}
