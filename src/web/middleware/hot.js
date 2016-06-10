// import historyApiFallback from 'connect-history-api-fallback';
import config from '~/webpack.config.babel';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';

const bundler = webpack(config);

const middleware = [
  webpackDevMiddleware(bundler, {
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    historyApiFallback: false,
    hot: true,
    stats: {
      colors: true,
    },
  }),
  webpackHotMiddleware(bundler, {
    log: console.log, // eslint-disable-line no-console
  }),
  // historyApiFallback(),
];

export { middleware as hotMiddleware };
