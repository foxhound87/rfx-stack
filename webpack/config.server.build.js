import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export function loader() {
  return {
    cssModules: {
      loader: ExtractTextPlugin.extract(
        'isomorphic-style-loader',
        ['css-loader?modules',
        'importLoaders=1',
        'localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']
         .join('&')),
    },
    cssGlobal: {
      loader: ExtractTextPlugin.extract('isomorphic-style-loader', 'css-loader!postcss-loader'),
    },
  };
}


export function config() {
  return {
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin('style.css', { disable: true }),
    ],
  };
}
