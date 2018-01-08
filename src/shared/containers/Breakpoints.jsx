import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';
import $ from '@/shared/styles/_.mixins';

// styles
const button = cx($.buttonPill, '_c1', '_b1');

@inject('store')
@observer
export default class MatchMedia extends Component {
  static fetchData() {}

  static propTypes = {
    store: React.PropTypes.object,
  };

  render() {
    const bp = this.props.store.ui.breakpoints;
    return (
      <div className="pv5">
        <Helmet title="MobX React MatchMedia" />
        <div className="ph4">
          <br />
          <br />
          <h1>MobX React MatchMedia</h1>
          <h4>
            Resize your browser window to see the breakpoints changing
            automatically.
          </h4>
          <p>The breakpoints are customizables in /src/shared/stores/ui.js</p>
          <br />
          <p>
            <button
              className={cx(button)}
              href="https://github.com/foxhound87/mobx-react-matchmedia"
            >
              <i className="fa fa-github" />{' '}
              <b>foxhound87/mobx-react-matchmedia</b>
            </button>
          </p>
          <p>
            <button
              className={cx(button)}
              href="https://www.npmjs.com/package/mobx-react-matchmedia"
            >
              <i className="fa fa-archive" />{' '}
              <b>package/mobx-react-matchmedia</b>
            </button>
          </p>
        </div>
        <table className="bg-white pa4 mt4 w-100 navy">
          <tbody>
            <tr>
              <td className="f4 pa3 tr">xs</td>
              <td className={cx('bold', 'tc', { green: bp.xs, red: !bp.xs })}>
                {bp.xs ? (
                  <i className="f3 fa fa-check-circle green" />
                ) : (
                  <i className="f3 fa fa-times-circle red" />
                )}
              </td>
              <td>Extra small devices</td>
            </tr>
            <tr>
              <td className="f4 pa3 tr">su</td>
              <td className={cx('bold', 'tc', { green: bp.su, red: !bp.su })}>
                {bp.su ? (
                  <i className="f3 fa fa-check-circle green" />
                ) : (
                  <i className="f3 fa fa-times-circle red" />
                )}
              </td>
              <td>Small devices and UP</td>
            </tr>
            <tr>
              <td className="f4 pa3 tr">sm</td>
              <td className={cx('bold', 'tc', { green: bp.sm, red: !bp.sm })}>
                {bp.sm ? (
                  <i className="f3 fa fa-check-circle green" />
                ) : (
                  <i className="f3 fa fa-times-circle red" />
                )}
              </td>
              <td>Small devices</td>
            </tr>
            <tr>
              <td className="f4 pa3 tr">md</td>
              <td className={cx('bold', 'tc', { green: bp.md, red: !bp.md })}>
                {bp.md ? (
                  <i className="f3 fa fa-check-circle green" />
                ) : (
                  <i className="f3 fa fa-times-circle red" />
                )}
              </td>
              <td>Medium devices</td>
            </tr>
            <tr>
              <td className="f4 pa3 tr">mu</td>
              <td className={cx('bold', 'tc', { green: bp.mu, red: !bp.mu })}>
                {bp.mu ? (
                  <i className="f3 fa fa-check-circle green" />
                ) : (
                  <i className="f3 fa fa-times-circle red" />
                )}
              </td>
              <td>Medium devices and UP</td>
            </tr>
            <tr>
              <td className="f4 pa3 tr">lg</td>
              <td className={cx('bold', 'tc', { green: bp.lg, red: !bp.lg })}>
                {bp.lg ? (
                  <i className="f3 fa fa-check-circle green" />
                ) : (
                  <i className="f3 fa fa-times-circle red" />
                )}
              </td>
              <td>Large devices and UP</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
