import webpack from 'webpack';
import nodeExternalModules from 'webpack-node-externals';
import path from 'path';
import getenv from 'getenv';
import env from '~/config/expose';

const Dir = global.DIR;

export function load(entry) {
  return {
    target: 'node',
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
    node: {
      __filename: true,
      __dirname: true,
    },
    plugins: [
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
      }),
      new webpack.DefinePlugin({
        'global.CONFIG': JSON.stringify(getenv.multi(env)),
        'global.TYPE': JSON.stringify('SERVER'),
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
  };
}
