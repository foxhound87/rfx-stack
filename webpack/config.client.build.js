import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

import vendor from '~/config/vendor';

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
        ],
      },
    },
    cssModules: {
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          [
            'css-loader?modules',
            'importLoaders=1',
            'localIdentName=[name]__[local]___[hash:base64:5]',
          ].join('&'),
          'postcss-loader',
        ].join('!'),
      }),
    },
    cssGlobal: {
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader',
      }),
    },
  };
}

export function config(entry) {
  return {
    bail: true,
    devtool: 'source-map',
    entry: {
      vendor,
      app: [
        'babel-polyfill',
        'isomorphic-fetch',
        'whatwg-fetch',
        path.join(Dir.src, entry, 'client'),
      ],
    },
    output: {
      path: path.join(Dir.public, 'build'),
      publicPath: '/build/',
      filename: [entry, 'app', 'bundle', 'js'].join('.'),
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: [entry, 'vendor', 'bundle', 'js'].join('.'),
      }),
      new ExtractTextPlugin({
        filename: [entry, 'style', 'css'].join('.'),
        allChunks: true,
      }),
    ],
  };
}
