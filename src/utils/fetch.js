/**
  Fetch data from components mapping "static fetchData()"
  and injecting store, router params and query.
  Used on the server-side. It returns a Promise.
 */
export function fetchData(store, components, params, query) {
  return Promise.all(components
    .map((component) => component.fetchData
      ? component.fetchData(store, params, query)
      : false));
}

/**
  Fetch data from components when the router matches the borwser location.
  It also prevent the first page to re-fetch data already fetched from the server.
  Used on the client-side.
 */
export function fetchDataOnLocationMatch(history, routes, match, store) {
  let ssrLocation = store.app.ssrLocation;
  history.listen((e) => {
    if (e.pathname !== ssrLocation) {
      match({ routes, location: e.pathname }, (error, redirect, props) => {
        if (props) fetchData(store, props.components, props.params, props.location.query);
      });
    }
    // enable subsequent fetches
    ssrLocation = false;
  });
}
