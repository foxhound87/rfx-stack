/* eslint import/no-extraneous-dependencies: 0 */
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import isDev from 'isdev';
import _ from 'lodash';

export function hotMiddleware({ wpc, wdmc, whmc }) {
  const bundler = webpack(wpc);

  return isDev ? [

    webpackDevMiddleware(bundler, _.merge(wdmc, {
      filename: wpc.output.filename,
      publicPath: wpc.output.publicPath,
    })),

    webpackHotMiddleware(bundler, _.merge(whmc, {
      log: () => {},
    })),

  ] : (req, res, next) => next();
}
