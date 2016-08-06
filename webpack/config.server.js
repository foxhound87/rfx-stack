/* eslint import/prefer-default-export: 0 */
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import getenv from 'getenv';
import env from '~/config/expose';

const Dir = global.DIR;

function nodeModules() {
  return fs
    .readdirSync(Dir.modules)
    .concat(['react-dom/server'])
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .reduce((ext, mod) => {
      ext[mod] = ['commonjs', mod].join(' '); // eslint-disable-line no-param-reassign
      return ext;
    }, {});
}

export function load(entry) {
  return {
    target: 'node',
    entry: [
      'babel-polyfill',
      path.join(Dir.run, entry),
    ],
    output: {
      path: Dir.nodeBuild,
      filename: [entry, 'bundle.js'].join('.'),
    },
    externals: nodeModules(),
    node: {
      __filename: true,
      __dirname: true,
    },
    plugins: [
      new webpack.ProvidePlugin({ Promise: 'bluebird' }),
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
