import { observable } from 'mobx';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default class UIStore {

  mui = {};

  @observable appNavIsOpen = true;
  @observable appBarMenuAccountIsOpen = false;

  @observable breakpoints = {
    xs: '(max-width: 767px)',
    su: '(min-width: 768px)',
    sm: '(min-width: 768px) and (max-width: 991px)',
    md: '(min-width: 992px) and (max-width: 1199px)',
    mu: '(min-width: 992px)',
    lg: '(min-width: 1200px)',
  };

  constructor(ui) {
    Object.assign(this, ui);
  }

  getMui() {
    const mui = global.CLIENT ? { userAgent: navigator.userAgent } : {};
    Object.assign(mui, lightBaseTheme);
    return getMuiTheme(this.mui, mui);
  }

  injectTapEv() {
    // Material-UI components use react-tap-event-plugin to listen for touch events
    // This dependency is temporary and will go away once react v1.0
    injectTapEventPlugin();
  }

  toggleAppNav() {
    this.appNavIsOpen = !this.appNavIsOpen;
  }

  toggleAppBarMenuAccount() {
    this.appBarMenuAccountIsOpen = !this.appBarMenuAccountIsOpen;
  }
}
