import { Dir } from '~/config';

export function getPreLoaders() {
  return {
    eslint: {
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: Dir.src,
    },
  };
}

export function getLoaders() {
  return {
    jsx: {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
    },
    json: {
      test: /\.json$/,
      loader: 'json-loader',
    },
    cssGlobal: {
      test: /\.global\.css$/,
      loader: 'style-loader!css-loader!postcss-loader',
    },
    cssModules: {
      test: /^((?!\.global).)*\.css$/,
      /* loader: based on target script */
    },
  };
}
