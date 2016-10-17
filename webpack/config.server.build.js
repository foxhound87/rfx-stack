import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import nodeExternalModules from 'webpack-node-externals';
import path from 'path';

const Dir = global.DIR;

export function loader() {
  return {
    cssModules: {
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'isomorphic-style-loader',
        loader: ['css-loader?modules',
        'importLoaders=1',
        'localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']
         .join('&'),
      }),
    },
    cssGlobal: {
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'isomorphic-style-loader',
        loader: 'css-loader!postcss-loader',
      }),
    },
  };
}

export function config(entry) {
  return {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      'whatwg-fetch',
      path.join(Dir.run, entry),
    ],
    output: {
      path: Dir.nodeBuild,
      filename: [entry, 'bundle.js'].join('.'),
    },
    externals: [nodeExternalModules()],
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin({
        filename: 'style.css',
        disable: true,
      }),
    ],
  };
}
