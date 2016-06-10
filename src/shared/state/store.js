import inject from '~/src/shared/stores';

let store = null;

export default function (state) {
  if (state) store = inject(state);
  return store;
}
