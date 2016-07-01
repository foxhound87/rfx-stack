import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from '../state/context';
import cx from 'classnames';

@connect
export default
class MatchMedia extends Component {

  static fetchData() {}

  render() {
    const bp = this.context.store.ui.breakpoints;
    return (
      <div className="bg-white p4 navy mt4">
        <Helmet title="MatchMedia + MobX" />
        <br />
        <br />
        <br />
        <h1>MatchMedia + MobX</h1>
        <p>Repo: https://github.com/foxhound87/mobx-react-matchmedia</p>
        <h4>Resize your browser window to see the breakpoints changing automatically.</h4>
        <p>The breakpoints are customizables in /src/shared/stores/ui.js</p>
        <hr />
        <table>
          <tbody>
            <tr>
              <td>xs</td>
              <td className={cx('bold', { olive: bp.xs, red: !bp.xs })}>
                {bp.xs ? 'YES' : 'NO'}
              </td>
              <td>Extra small devices</td>
            </tr>
            <tr>
              <td>su</td>
              <td className={cx('bold', { olive: bp.su, red: !bp.su })}>
                {bp.su ? 'YES' : 'NO'}
              </td>
              <td>Small devices and UP</td>
            </tr>
            <tr>
              <td>sm</td>
              <td className={cx('bold', { olive: bp.sm, red: !bp.sm })}>
                {bp.sm ? 'YES' : 'NO'}
              </td>
              <td>Small devices</td>
            </tr>
            <tr>
              <td>md</td>
              <td className={cx('bold', { olive: bp.md, red: !bp.md })}>
                {bp.md ? 'YES' : 'NO'}
              </td>
              <td>Medium devices</td>
            </tr>
            <tr>
              <td>mu</td>
              <td className={cx('bold', { olive: bp.mu, red: !bp.mu })}>
                {bp.mu ? 'YES' : 'NO'}
              </td>
              <td>Medium devices and UP</td>
            </tr>
            <tr>
              <td>lg</td>
              <td className={cx('bold', { olive: bp.lg, red: !bp.lg })}>
                {bp.lg ? 'YES' : 'NO'}
              </td>
              <td>Large devices and UP</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
