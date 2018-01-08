import webpack from 'webpack';
import getenv from 'getenv';
import env from '~/config/expose';

export function load() {
  return {
    target: 'web',
    plugins: [
      new webpack.DefinePlugin({
        'global.DIR': JSON.stringify(global.DIR),
        'global.CONFIG': JSON.stringify(getenv.multi(env)),
        'global.TYPE': JSON.stringify('CLIENT'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  };
}
