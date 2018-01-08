import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

import postcss from '~/config/postcss';

const Dir = global.DIR;

export function loader() {
  return {
    jsx: {
      query: {
        presets: [['es2015', { modules: false }], 'stage-0', 'react'],
        plugins: [
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-runtime',
          'babel-root-import',
        ],
      },
    },
    cssModules: {
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
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
        fallback: 'style-loader',
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
    bail: true,
    entry: {
      app: [
        'babel-polyfill',
        'isomorphic-fetch',
        'whatwg-fetch',
        path.join(Dir.src, entry, 'client'),
      ],
    },
    output: {
      path: Dir.staticBuild,
      publicPath: '/build/',
      filename: `${entry}.[name].bundle.js`,
      chunkFilename: '[name].[hash:5].bundle.js',
    },
    module: {
      noParse: /mapbox-gl\.js$/,
    },
    plugins: [
      new CleanWebpackPlugin(Dir.staticBuild, {
        root: Dir.root,
      }),
      new ExtractTextPlugin({
        filename: `${entry}.style.css`,
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ context }) => context && context.includes('node_modules'),
      }),
    ],
  };
}
