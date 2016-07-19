import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from '~/src/utils/state';
import cx from 'classnames';

// components
import { Parallax } from 'react-parallax';

// module styles
import styles from '../styles/home.css';

@connect('store')
export default class Home extends Component {

  static fetchData() {}

  render() {
    const bp = this.context.store.ui.breakpoints;
    return (
      <div>
        <Helmet title="Home" />
        <div className="center">
          <Parallax bgImage="/static/img/bg.jpg" strength={400}>
            <h1
              className={cx(styles.title, {
                [styles.xsTitle]: bp.xs,
                [styles.suTitle]: bp.su,
              })}
            >RFX STACK</h1>
            <h2
              className={cx(styles.subTitle, {
                [styles.xsSubTitle]: bp.xs,
                [styles.suSubTitle]: bp.su,
              })}
            >Universal App featuring: React + Feathers + MobX
            </h2>
          </Parallax>
        </div>
        <div className={styles.features}>
          <div className="center">
            <div className="md-flex mx4">
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-eye" />
                <br /> MobX Reactive State Management
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-bolt" />
                <br /> Blazing fast Real Time by Feathers
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-arrows-h" />
                <br /> React HOC for Responsive Media Queries
              </div>
            </div>
            <div className="md-flex mx4">
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-recycle" />
                <br /> Isomorphic Fetch/Socket
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-cube" />
                <br /> Microservices Ready
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-diamond" />
                <br /> Multi Platform Ready
              </div>
            </div>
            <div className="md-flex mx4">
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-fire" />
                <br /> React Hot Loader 3
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-gears" />
                <br /> Action Dispatcher for Stateless Components
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-object-ungroup" />
                <br /> Modular CSS for React
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
