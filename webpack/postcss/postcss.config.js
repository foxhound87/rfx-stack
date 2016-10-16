import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssFocus from 'postcss-focus';
import postcssUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import cssnano from 'cssnano';

export default function getConfig(bundler) {
  return [
    postcssImport({ addDependencyTo: bundler }),
    postcssUrl('inline'),
    postcssExtend(),
    postcssFocus(),
    autoprefixer(),
    precss(),
    cssnano(),
  ];
}
