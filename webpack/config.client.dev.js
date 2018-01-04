import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpack from 'webpack';
import getenv from 'getenv';
import path from 'path';

import postcss from '~/config/postcss';

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
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
          options: postcss,
        },
      ],
    },
    cssGlobal: {
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: postcss,
        },
      ],
    },
  };
}

export function config(entry) {
  return {
    devServer: {
      host: getenv('WEB_HOST'),
      port: getenv('WEB_PORT'),
      contentBase: Dir.public,
      historyApiFallback: true,
      hot: true,
    },
    entry: {
      app: [
        'babel-polyfill',
        'isomorphic-fetch',
        'whatwg-fetch',
        'react-hot-loader/patch',
        path.join(Dir.src, entry, 'client'),
      ],
    },
    output: {
      path: '/',
      publicPath: '/',
      filename: 'bundle.js',
      chunkFilename: '[name].bundle.js',
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: logServerConfigWebpack(entry),
        },
      }),
      new HtmlWebpackPlugin({
        template: './src/web/views/client.dev.html',
      }),
      new BrowserSyncPlugin(
        {
          host: getenv('BROWSERSYNC_HOST'),
          port: getenv('BROWSERSYNC_PORT'),
          proxy: webhost(entry),
        },
        { reload: false },
      ),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
}
