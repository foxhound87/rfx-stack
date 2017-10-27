module.exports = ({ env, webpack }) => ({
  parser: false,
  plugins: {
    'postcss-import': { addDependencyTo: webpack },
    'postcss-url': {},
    'postcss-extend': {},
    'postcss-focus': {},
    // 'postcss-cssnext': {},
    autoprefixer: {},
    precss: {},
    cssnano: env === 'production' ? { safe: true } : false,
  },
});
