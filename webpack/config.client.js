import webpack from 'webpack';
import path from 'path';
import { Dir, ExposeConfigToClient } from '~/config';

export function load() {
  return {
    target: 'web',
    entry: [
      'babel-polyfill',
      path.join(Dir.src, 'client'),
    ],
    output: {
      path: path.join(Dir.public, 'build'),
      filename: 'bundle.js',
    },
    plugins: [
      // new webpack.optimize.OccurenceOrderPlugin(), // Webpack 1.0
      new webpack.optimize.OccurrenceOrderPlugin(),  // Webpack 2.0 fixed this mispelling
      new webpack.DefinePlugin({
        'global.CONFIG': JSON.stringify(ExposeConfigToClient),
        'global.CLIENT': JSON.stringify(true),
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      }),
    ],
  };
}
