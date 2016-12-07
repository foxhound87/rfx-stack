import cx from 'classnames';

const buttonBase = cx('f6', 'ba', 'ph3', 'pv2', 'mb2', 'dib', 'pointer');

const buttonGeneric = cx(buttonBase, 'br2');

const buttonPill = cx(buttonBase, 'br-pill', '_c1', '_b1', 'bg-transparent');

const buttonPillSearch = cx(buttonBase,
  'fl', 'f6', 'f5-l', 'button-reset', 'pv2', 'tc', 'bn', 'bg-animate',
  'pointer', 'w-25', 'w-20-l', 'br2', 'br--right',
  'br--right-ns', '_c4', '_bg3',
);

const buttonGroupBase = cx(buttonBase, '_b1', '_c1', 'bg-transparent');

const buttonGroupCenter = cx(buttonGroupBase);

const buttonGroupLeft = cx(buttonGroupBase, 'br2', 'br--left');

const buttonGroupRight = cx(buttonGroupBase, 'br2', 'br--right');

const inputSearch = cx(
  'fl', 'f6', 'f5-l', 'input-reset', 'bn', 'black-80', 'bg-white',
  'fl', 'pa2', 'lh-solid', 'w-75', 'w-80-l', 'br2', 'br--left',
);

export default {
  buttonBase,
  buttonGeneric,
  buttonPill,
  buttonPillSearch,
  buttonGroupCenter,
  buttonGroupLeft,
  buttonGroupRight,
  inputSearch,
};
