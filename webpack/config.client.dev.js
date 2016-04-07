import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import NpmInstallWebpackPlugin from 'npm-install-webpack-plugin';
import webpack from 'webpack';
import { Config } from '~/config';

export function loader() {
  return {
    jsx: {
      query: {
        presets: ['react-hmre'],
      },
    },
    cssModules: {
      loaders: [
        'style-loader',
        ['css-loader?modules',
        'importLoaders=1',
        'localIdentName=[name]__[local]___[hash:base64:5]']
        .join('&'),
        'postcss-loader',
      ],
    },
  };
}

export function config() {
  return {
    devtool: 'cheap-module-eval-source-map',
    entry: ['webpack-hot-middleware/client'],
    plugins: [
      new BrowserSyncPlugin({
        host: Config.browsersync.host,
        port: Config.browsersync.port,
        proxy: ['http://', Config.web.host, ':', Config.web.port].join(''),
      }, { reload: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new NpmInstallWebpackPlugin({ save: true }),
    ],
  };
}
