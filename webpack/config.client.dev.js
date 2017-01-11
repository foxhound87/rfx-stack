import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import webpack from 'webpack';
import getenv from 'getenv';
import path from 'path';

import { logServerConfigWebpack, webhost } from '@/utils/logger';

const Dir = global.DIR;

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

export function config(entry) {
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
        path.join(Dir.src, entry, 'client'),
      ],
    },
    output: {
      path: '/',
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: logServerConfigWebpack(entry),
        },
      }),
      new BrowserSyncPlugin({
        host: getenv('BROWSERSYNC_HOST'),
        port: getenv('BROWSERSYNC_PORT'),
        proxy: webhost(entry),
      }, { reload: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  };
}
