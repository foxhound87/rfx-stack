// import historyFallback from 'connect-history-api-fallback';
import config from '~/webpack.config.babel';
import webpack from 'webpack';
import whm from 'webpack-hot-middleware';
import wdm from 'webpack-dev-middleware';

const compiler = webpack(config);

const middleware = [
  // historyFallback(), // use only if iso-middleware is disabled
  whm(compiler),
  wdm(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    quiet: true,
    stats: {
      colors: true,
    },
  }),
];

export { middleware as hotMiddleware };
