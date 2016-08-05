/* eslint import/prefer-default-export: 0 */
export function extend(...args) {
  const $extend = args[0] || null;
  return (target) => {
    Object.assign(target.prototype, {
      ___extend: $extend,
    });
  };
}
