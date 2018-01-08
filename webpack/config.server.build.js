import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import nodeExternalModules from 'webpack-node-externals';
import path from 'path';

import postcss from '~/config/postcss';

const Dir = global.DIR;

export function loader() {
  return {
    jsx: {
      query: {
        cacheDirectory: true,
        presets: [['es2015', { modules: false }], 'stage-0', 'react'],
        plugins: [
          'system-import-transformer',
          'transform-decorators-legacy',
          'transform-runtime',
          'transform-class-properties',
          'babel-root-import',
        ],
      },
    },
    cssModules: {
      loader: ExtractTextPlugin.extract({
        fallback: 'isomorphic-style-loader',
        use: [
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
      }),
    },
    cssGlobal: {
      loader: ExtractTextPlugin.extract({
        fallback: 'isomorphic-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcss,
          },
        ],
      }),
    },
  };
}

export function config(entry) {
  return {
    entry: [
      'babel-polyfill',
      'isomorphic-fetch',
      'whatwg-fetch',
      path.join(Dir.run, entry),
    ],
    output: {
      path: Dir.nodeBuild,
      filename: `${entry}.bundle.js`,
      chunkFilename: '[name].bundle.js',
    },
    externals: [nodeExternalModules()],
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin({
        disable: true,
      }),
    ],
  };
}
