import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import nodeExternalModules from 'webpack-node-externals';
import path from 'path';

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
          'css-loader?modules',
          'importLoaders=1',
          'localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
        ].join('&'),
      }),
    },
    cssGlobal: {
      loader: ExtractTextPlugin.extract({
        fallback: 'isomorphic-style-loader',
        use: 'css-loader!postcss-loader',
      }),
    },
  };
}

export function config(entry) {
  return {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      'isomorphic-fetch',
      'whatwg-fetch',
      path.join(Dir.run, entry),
    ],
    output: {
      path: Dir.nodeBuild,
      filename: [entry, 'bundle', 'js'].join('.'),
    },
    externals: [nodeExternalModules()],
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin({
        disable: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      }),
    ],
  };
}
