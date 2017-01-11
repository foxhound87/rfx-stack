/**
  Store Bootstrap
  @return array of promises
 */
export default store => ([
  store.auth.authenticate(),
]);
