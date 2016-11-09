/* eslint import/no-extraneous-dependencies: 0 */
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssFocus from 'postcss-focus';
import postcssUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import cssnano from 'cssnano';

export default bundler => [
  postcssImport({ addDependencyTo: bundler }),
  postcssUrl('inline'),
  postcssExtend(),
  postcssFocus(),
  autoprefixer(),
  precss(),
  cssnano(),
];
