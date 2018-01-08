# Index

- [Introduction](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#introduction)
- [Requirements](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#requirements)
- [Scripts](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#scripts)
  - [Utils](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#utils)
  - [Builders](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#builders)
  - [Runners](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#runners)
- [Electron](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#electron)
- [Setup Stores](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#setup-stores)
- [Server Side Rendering](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#server-side-rendering)
- [Connect / Observer](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#connect--observer)
- [Dispatch / Actions](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#dispatch--actions)


# Introduction
With the RFX Stack you can build and run different pieces of the app independently.

You are also free to change some of its parts as you need.

For this purpose the code is divided into differents compartments:

- api
- electron
- seeds
- shared
- utils
- web

This structure does not force you to separate the server-side code from the client-side, as with React and its server side rendering features, these two concepts are more coupled than ever. The **web** directory contains both the server and client code specifically needed for in-browser rendering. The **shared** directory contains code that can be shared, for example, with React Native or Electron in the same project. That's the main goal: provide flexibility and extensibility.

---

# Requirements

- node@^5.x.x
- npm@^3.3.x

---

# Scripts

## Utils

| Command | Description |
|---|---|
| **lint** | Code linting & syntax cheking. |
| **clean:build** | Delete all the generated bundles. |
| **clean:modules** | Delete `node_modules` and cache |


## Builders

| Command | Type | Output Dir | Description |
|---|---|---|---|
| **build:client:web** | client | `/public/build` | Build the browser client-side code of the **web** app. |
| **build:server:web** | server | `/run/build` | Build the node server-side code of the **web** app. |
| **build:server:api** | server | `/run/build` | Build the node server-side code of the **api** app. |

## Runners

##### ENV: Development
| Command | Env | Description |
|---|---|---|
| **web:client** | development | client side rendering | Run only the **web** app. |
| **web:server** | development | server side rendering | Run only the **web** app. |
| **api:dev** | development | Run only the **api** app. |
| **seed:dev** | development | Run only the **seed** app. |

##### ENV: Production
| Command | Env | Description |
|---|---|---|
| **web:prod** | production | Run only the **web** app. |
| **api:prod** | production | Run only the **api** app. |
| **seed:prod** | production | Run only the **seed** app. |

---

# Electron

Go to `/src/electron` and run `npm install`.

The `electron` app depends directly from the `web` app, so the client side bundles must be availables running the web app in dev mode or building the client-side code for prod mode.

If you want develop with the hot loader enabled you have to make sure that the global `global.HOT` is defined in `/src/electron/src/globals.js`.

When you want to go in production, just set it to false or comment it.

So, in case you disabled it, you have to build the client-side code.

Then to start the app, run in sequence:

> in the project root:

`npm run api:dev`

`npm run build:client:web` // only if **global.HOT** is NOT defined

`npm run web:client` // only if **global.HOT** is defined

`npm run web:server` // only if **global.HOT** is defined

> in the electron root:

`npm start`


# Setup Stores

Create your stores files as Classes with `export default class` in `/src/shared/stores/*` and then assigns them a key in the `store.setup() method` in the `/src/shared/stores.js` file.

```javascript
import { store } from 'rfx-core';

import UIStore from './stores/ui';

/**
  Stores
*/
export default store
  .setup({
    ui: UIStore,
  });

```

The mapped Stores are called by the **Store Initalizer** of the `rfx-core` that will automatically inject the **inital state** in themselves. It is also be used as a getter of the Stores.

Now we can use the `mobx-react` **Provide** Component on both client and server:

```javascript
import { Provider } from 'mobx-react';

<Provider store={store}>
  ...
</Provider>
```

On the **server**-side: `/src/web/ssr.js`;

On the **client**-side: `/src/web/App.js`;

# Server Side Rendering

Define the inital state of the Stores in `/src/web/ssr.js` injecting it using the `inject` method of the Store Initalizer.

```javascript
import stores from '~/src/shared/stores';
...

const store = stores.inject({
  app: { ssrLocation: req.url },
  // put here the inital state of other stores...
});
```

The inital state can be dynamically updated using **fetchData**:

For fetching specific data on specific pages (rendered both on the server and client), we use a `static fetchData({ store, params, query })` inside our react containers in`/src/shared/containers/*`. It passes the stores, and react-router params and query for the current location.

```javascript
class Home extends Component {

  static fetchData({ store }) {
    return store.post.find();
  }

  ...
```

**static fetchData()** will be automatically called when React Router reaches that component.


# Connect / Observer

Use the `mobx-react` **@observer** decorator to pass the `stores` props to the **Containers**.


in `/src/shared/containers/*`:

```javascript
import { observer } from 'mobx-react';
...

@observer(['store'])
export default class Home extends Component {

  static propTypes = {
    store: React.PropTypes.object,
  };

  render() {
    const items = this.props.store.post.list;
    return (
     ...
    );
  }
}
```

The **@connect** decorator also wraps the component with the MobX **observer** making it reactive.

You can use it also on the Stateless Components to make it reactive, but you cannot access the provided stores from there, you must pass the store as props from a parent component (a container) instead.

# Dispatch / Actions

The **dispatch()** function is handy to call an **action** when handle component events. It can also be called from another Store too.

Use the dot notation to select a store key (defined in **Setup Stores** previously) and the name of the method/action:

```javascript
import { dispatch } from 'rfx-core';

...

const handleOnSubmitFormRegister = (e) => {
  e.preventDefault();
  dispatch('auth.login', { email, password }).then( ... );
};
```

Also params can be passed if needed.
