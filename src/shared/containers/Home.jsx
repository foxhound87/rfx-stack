import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { Parallax } from 'react-parallax';
import styles from '../styles/Home.css';

@observer(['store'])
export default class Home extends Component {

  static fetchData() {}

  static propTypes = {
    store: React.PropTypes.object,
  };

  render() {
    const bp = this.props.store.ui.breakpoints;
    return (
      <div className="helvetica">
        <Helmet title="Home" />
        <div className="tc">
          <Parallax bgImage="/static/img/bg.jpg" strength={400}>
            <h1
              className={cx(
                'tracked',
                styles.title, {
                  [styles.xsTitle]: bp.xs,
                  [styles.suTitle]: bp.su,
                })}
            >RFX STACK</h1>
            <h2
              className={cx(
                'tracked-mega',
                styles.subTitle, {
                  [styles.xsSubTitle]: bp.xs,
                  [styles.suSubTitle]: bp.su,
                })}
            >Universal App featuring: React + Feathers + MobX
            </h2>
          </Parallax>
        </div>
        <div className={styles.features}>
          <div className="tc">
            <div className="dt-ns dt--fixed-ns pv3">
              <div className="dtc-ns tc pa5">
                <i className="mb4 fa fa-eye" />
                <br /> MobX Reactive State Management
              </div>
              <div className="dtc-ns tc pa5">
                <i className="mb4 fa fa-bolt" />
                <br /> Blazing fast Real Time by Feathers
              </div>
              <div className="dtc-ns tc pa5">
                <i className="mb4 fa fa-arrows-h" />
                <br /> React HOC for Responsive Media Queries
              </div>
            </div>
            <div className="dt-ns dt--fixed-ns pv3">
              <div className="dtc-ns tc pa5">
                <i className="mb4 fa fa-recycle" />
                <br /> Isomorphic Fetch/Socket
              </div>
              <div className="dtc-ns tc pa5">
                <i className="mb4 fa fa-cube" />
                <br /> Microservices Ready
              </div>
              <div className="dtc-ns tc pa5">
                <i className="mb4 fa fa-fire" />
                <br /> React Hot Loader 3
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
