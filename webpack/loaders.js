import { Dir } from '~/src/config';

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
      test: /^((?!\.mdl).)*css$/,
      loader: 'style-loader!css-loader!postcss-loader',
    },
    cssModules: {
      test: /\.mdl.css$/,
      /* loader: based on target script */
    },
  };
}
