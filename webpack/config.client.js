/* eslint import/prefer-default-export: 0 */
import webpack from 'webpack';
import getenv from 'getenv';
import env from '~/config/expose';

export function load() {
  return {
    target: 'web',
    entry: [
      'babel-polyfill',
    ],
    plugins: [
      new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
      new webpack.optimize.OccurenceOrderPlugin(), // Webpack 1.0
      // new webpack.optimize.OccurrenceOrderPlugin(),  // Webpack 2.0 fixed this mispelling
      new webpack.DefinePlugin({
        'global.DIR': JSON.stringify(global.DIR),
        'global.CONFIG': JSON.stringify(getenv.multi(env)),
        'global.TYPE': JSON.stringify('CLIENT'),
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
