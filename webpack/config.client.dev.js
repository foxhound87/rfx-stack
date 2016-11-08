import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import webpack from 'webpack';
import getenv from 'getenv';
import path from 'path';

const Dir = global.DIR;

const webhost = ['http://', getenv('WEB_HOST'), ':', getenv('WEB_PORT')].join('');

export function loader() {
  return {
    jsx: {
      query: {
        presets: [['es2015', { modules: false }], 'stage-0', 'react'],
        plugins: [
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-runtime',
          'babel-root-import',
          'react-hot-loader/babel',
        ],
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
    entry: {
      app: [
        'babel-polyfill',
        'isomorphic-fetch',
        'whatwg-fetch',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        // ['webpack-hot-middleware/client', webhost].join('?'),
        path.join(Dir.web, 'client'),
      ],
      vendor: [
        'react', 'react-dom', 'mobx', 'mobx-react', 'bluebird', 'socket.io-client',
      ],
    },
    output: {
      path: '/',
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new BrowserSyncPlugin({
        host: getenv('BROWSERSYNC_HOST'),
        port: getenv('BROWSERSYNC_PORT'),
        proxy: webhost,
      }, { reload: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  };
}
