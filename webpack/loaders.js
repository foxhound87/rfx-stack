const Dir = global.DIR;

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
    url: {
      // the "?v=" regex fixes fontawesome issue
      test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
      loader: 'url-loader?limit=10000',
    },
    file: {
      // the "?v=" regex fixes fontawesome issue
      test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
      loader: 'file-loader',
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
