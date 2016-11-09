import webpack from 'webpack';
import getenv from 'getenv';
import env from '~/config/expose';
import postcss from '~/config/postcss';

export function load() {
  return {
    target: 'async-node',
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
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          postcss: postcss(webpack),
        },
      }),
    ],
  };
}
