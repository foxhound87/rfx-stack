# Introduction
With the RFX Stack you can build and run different pieces of the app independently.

You are also free to change some of its parts as you need.

For this purpose the code is divided in differents compartments:

- api
- seeds
- web
- shared
- utils

This structure does not force you to separate the server-side code from the client-side, as with React and its server side rendering features, these two concepts are more coupled then ever. The **web** directory contains both the server and client code specifically needed for in-browser rendering. The **shared** directory contains code that can be shared, for example, with React Native or Electron in the same project. That's the main goal: provide flexibility and extensibility.

---

# Requirements

- node@^5.x.x
- npm@^3.3.x

---

# Scripts

## Main

- **lint** [Code linting / syntax cheking]
- **clean:build** [Delete all the generated bundles]
- **clean:modules** [Delete node_modules and cache]

## Build
- **build:client:web** [Build the browser client-side code of the **web** app in /public/build]
- **build:server:web** [Build the node server-side code of the **web** app in /run/build]
- **build:server:api** [Build the node server-side code of the **api** app in /run/build]

## Runners

##### ENV: Development
- **web:dev** [Run only the **web** app (development)]
- **api:dev** [Run only the **api** app (development)]
- **seed:dev** [Run only the **seed** app (development)]

##### ENV: Production
- **web:prod** [Run only the **web** app (production)]
- **api:prod** [Run only the **api** app (production)]
- **seed:prod** [Run only the **seed** app (production)]

---


# Setup Stores

Create your stores files as Classes with `export default class` in `/src/shared/stores/*` and then assigns them a key in the `export const stores` of the `/src/shared/stores.js` file.

```
import PostStore from './stores/foo';

/**
  Stores
*/
export const stores = {
  post: FooStore,
};
```

The mapped stores are called by the **Store Initalizer** located at `/src/shared/state/store.js`. The Store Initializer will automatically **inject** the inital state into the Stores. It is also be used as a getter of the Stores.

# Context Provider

The Context Providers the mechanism to access the Stores from a React Container by inject them into the React Context.

It is a React Component used both on client and server:

```
<ContextProvider context={{ store }}>
  ...
</ContextProvider>
```

On the **server**-side: `/src/web/middleware/iso.js`;

On the **client**-side: `/src/web/App.js`;

# Server Side Rendering

Define the inital state of the stores in `/src/web/middleware/iso.js` injecting it into the  initStore function (the Store Initalizer)

```
const store = initStore({
  app: { ssrLocation: req.url },
  // put here the inital state of other stores...
});
```

The inital state can be dynamically updated using **fetchData**:

For fetching specific data on specific pages (rendered both on the server and client), we use a `static fetchData(store, params, query)` inside our react containers in`/src/shared/containers/*`. It passes the stores, and react-router params and query for the current location.

```
class Home extends Component {

  static fetchData(store) {
    return store.post.find();
  }

  ...
```

**static fetchData(store)** will be automatically called when React Router reaches that component.


# Connect / Observer

Use the **@connect** decorator to pass the Stores to the **Containers** through the React Context.


in `/src/shared/containers/*`:

```
import { connect } from '../state/context';

...

@connect
export default class Home extends Component {

  render() {
    const items = this.context.store.post.list;
    return (
     ...
    );
  }
}
```

The **@connect** decorator also wraps the component with the MobX **observer** making it reactive.

You can use it also on the Stateless Components to make it reactive, but you cannot access the context from there, you must pass the store as props from a parent instead.

# Dispatch / Actions

The **dispatch()** function is handy to access an **action** from a Store when handle events.

It uses the dot notation to select a store key (defined on Setup Stores previously) and the name of the method/action:

```
import { dispatch } from '../state/dispatcher';

...

const handleOnSubmitFormRegister = (e) => {
  e.preventDefault();
  dispatch('auth.login', { email, password }).then( ... );
};
```

Also params can be passed if needed.

