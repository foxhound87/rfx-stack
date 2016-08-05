/* eslint import/prefer-default-export: 0 */

// Add a delay to test slower connections
export function addDelay(delay) {
  return (hook, next) => {
    setTimeout(next, delay);
  };
}
