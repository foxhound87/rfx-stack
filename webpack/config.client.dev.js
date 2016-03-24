import NpmInstallWebpackPlugin from 'npm-install-webpack-plugin';
import webpack from 'webpack';

export function loader() {
  return {
    jsx: {
      query: {
        presets: ['react-hmre'],
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
    entry: ['webpack-hot-middleware/client'],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new NpmInstallWebpackPlugin({ save: true }),
    ],
  };
}
