import inject from './index';

let store = null;

export default function (state) {
  if (state) store = inject(state);
  return store;
}
