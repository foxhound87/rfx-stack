# RFX Stack

#### Universal App featuring:
### React + Feathers + MobX
---

[![GitHub license](https://img.shields.io/github/license/foxhound87/rfx-stack.svg)]()
[![node](https://img.shields.io/badge/node-5.0%2B-blue.svg)]()
[![npm](https://img.shields.io/badge/npm-3.3%2B-blue.svg)]()

## Changelog & Documentation
See the [Changelog](https://github.com/foxhound87/rfx-stack/blob/master/CHANGELOG.md) or the [Documentation](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md) for all the details.

---

## Main Features
- Hot-Reloadable MobX Stores
- Action Dispatcher for Stateless Components
- Server Side Rendering (SSR)
- Reactive UI & Media Queries
- React Hot Loader 3
- React Stateless Components
- Isomorphic Fetch/Socket
- Multi Platform Ready
- Real Time Ready
- Microservices Ready
- Functional & Modular CSS
- Webpack 2 w/ code-splitting

## Main Libs

| Name | Description | | |
|---|---|---|---|
| **react** | View Layer | [GitHub &#10140;](https://github.com/facebook/react) | [NPM &#10140;](https://www.npmjs.com/package/react) |
| **react-router** | Routing  | [GitHub &#10140;](https://github.com/reactjs/react-router) | [NPM &#10140;](https://www.npmjs.com/package/react-router) |
| **mobx** | State Management | [GitHub &#10140;](https://github.com/mobxjs/mobx) | [NPM &#10140;](https://www.npmjs.com/package/mobx) |
| **feathers** | Server, CRUD & Data Transport | [GitHub &#10140;](https://github.com/feathersjs/feathers) | [NPM &#10140;](https://www.npmjs.com/package/feathers) |
| **postcss** | Styling | [GitHub &#10140;](https://github.com/postcss/postcss) | [NPM &#10140;](https://www.npmjs.com/package/postcss) |
| **browser-sync** | Live Browser Syncing | [GitHub &#10140;](https://github.com/browsersync/browser-sync) | [NPM &#10140;](https://www.npmjs.com/package/browser-sync) |
| **mobx-react-form** | Forms Management | [GitHub &#10140;](https://github.com/foxhound87/mobx-react-form) | [NPM &#10140;](https://www.npmjs.com/package/mobx-react-form) |
| **babel** | Javascript Transpiler | [GitHub &#10140;](https://github.com/babel/babel) | [NPM &#10140;](https://www.npmjs.com/package/babel) |
| **webpack 3** | Javascript Bundler | [GitHub &#10140;](https://github.com/webpack/webpack) | [NPM &#10140;](https://www.npmjs.com/package/webpack) |
| **eslint** | Code Linter | [GitHub &#10140;](https://github.com/eslint/eslint) | [NPM &#10140;](https://www.npmjs.com/package/eslint) |
| **eslint-config-airbnb** | Code Style Guide & Rules | [GitHub &#10140;](https://github.com/airbnb/javascript) | [NPM &#10140;](https://www.npmjs.com/package/eslint-config-airbnb) |
| **electron** | Cross platform desktop app | [GitHub &#10140;](https://github.com/electron/electron) | [Website &#10140;](http://electron.atom.io/) | |


---

# Quick Setup

> Run a local MongoDB instance (port 27017) before start the server.
[Install MongoDB](https://docs.mongodb.org/manual/administration/install-community/)

#### ENV: Development

`npm install`

> Run each script in different terminals.

`npm run api:dev`

`npm run web:client`

`npm run web:server`

> Run the **seed** app or the **web** app after the **api** app is running.

`npm run seed:dev`

#### ENV: Production

`npm install`

> Build

`npm run build:client:web`

`npm run build:server:web`

`npm run build:server:api`

> Run

`npm run api:prod`

`npm run web:prod`

#### Electron App

[Click here to see how to setup the electron app](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md#electron)

---

## Getting started with RFX Stack

- [Ten minute introduction to MobX and React](https://mobxjs.github.io/mobx/getting-started.html)
- [State Management and Hydration with MobX for SSR](https://medium.com/@foxhound87/state-management-hydration-with-mobx-we-must-react-ep-05-1922a72453c6)
- [Functional CSS - The Good, The Bad, and Some Protips for React.js Users](https://github.com/chibicode/react-functional-css-protips)
- [Feathers API service composition with hooks](https://blog.feathersjs.com/api-service-composition-with-hooks-47af13aa6c01)


## Credits

Thanks to [Eric John Juta](https://github.com/rej156) for his contribution about the **Hot-Reloadable MobX Stores** implementation.

## Contributing

If you like this stack, don't forget to star the repo!

If you want to contribute to the development, do not hesitate to fork the repo and send pull requests.
