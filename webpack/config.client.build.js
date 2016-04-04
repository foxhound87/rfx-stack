import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import webpack from 'webpack';

export function loader() {
  return {
    cssModules: {
      loader: ExtractTextPlugin.extract(
        'style-loader',
        ['css-loader?modules',
        'importLoaders=1',
        'localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']
         .join('&')),
    },
    cssGlobal: {
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
    },
  };
}

export function config() {
  return {
    bail: true,
    devtool: 'source-map',
    output: { publicPath: '/build/' },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        dropDebugger: true,
        dropConsole: true,
        compressor: {
          warnings: false,
        },
      }),
      new ExtractTextPlugin('style.css', {
        allChunks: true,
      }),
    ],
  };
}
