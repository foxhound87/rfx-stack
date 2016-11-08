import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

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
        fallbackLoader: 'style-loader',
        loader: [
          'css-loader?modules',
          'importLoaders=1',
          'localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
        ].join('&'),
      }),
    },
    cssGlobal: {
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader!postcss-loader',
      }),
    },
  };
}

export function config() {
  return {
    bail: true,
    devtool: 'source-map',
    entry: {
      app: [
        'babel-polyfill',
        'isomorphic-fetch',
        'whatwg-fetch',
        path.join(Dir.web, 'client'),
      ],
      vendor: [
        'react', 'react-dom', 'mobx', 'mobx-react', 'bluebird', 'socket.io-client',
      ],
    },
    output: {
      path: path.join(Dir.public, 'build'),
      publicPath: '/build/',
      filename: 'bundle.js',
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          keep_fnames: true,
        },
      }),
      new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true,
      }),
    ],
  };
}
