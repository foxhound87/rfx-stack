// import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import webpack from 'webpack';
// import getenv from 'getenv';
import path from 'path';

const Dir = global.DIR;

// const webhost = ['http://', getenv('WEB_HOST'), ':', getenv('WEB_PORT')].join('');

export function loader() {
  return {
    jsx: {
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: [
          'babel-root-import',
          'jsx-control-statements',
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-decorators',
          'react-hot-loader/babel',
        ],
      },
    },
    cssModules: {
      loaders: [
        'style-loader',
        ['css-loader?modules',
        'importLoaders=1',
        'localIdentName=[name]__[local]___[hash:base64:5]']
        .join('&'),
        'postcss-loader',
      ],
    },
  };
}

export function config() {
  return {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      // ['webpack-hot-middleware/client', webhost].join('?'),
      path.join(Dir.web, 'client'),
    ],
    output: {
      path: '/',
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      // new BrowserSyncPlugin({
      //   host: getenv('BROWSERSYNC_HOST'),
      //   port: getenv('BROWSERSYNC_PORT'),
      //   proxy: webhost,
      // }, { reload: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  };
}
