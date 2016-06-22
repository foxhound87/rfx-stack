# RFX Stack

#### Universal App featuring:
### React + Feathers + MobX
---

[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![node](https://img.shields.io/badge/node-5.0%2B-blue.svg)]()
[![npm](https://img.shields.io/badge/npm-3.3%2B-blue.svg)]()

## Changelog & Documentation
See the [Changelog](https://github.com/foxhound87/rfx-stack/blob/master/CHANGELOG.md) or the [Documentation](https://github.com/foxhound87/rfx-stack/blob/master/DOCUMENTATION.md) for all the details.

---

## Main Features
- Hot-Reloadable MobX Stores
- Action Dispatcher for Stateless Components
- Server Side Rendering
- Reactive UI & Media Queries
- React Hot Loader 3
- React Stateless Components
- Isomorphic Fetch/Socket
- Real Time Ready
- Microservices Ready
- Modular CSS for React

## Main Libs

- View Layer: [React](https://www.npmjs.com/package/react)
- Routing: [React Router](https://www.npmjs.com/package/react-router)
- State Management: [MobX](https://www.npmjs.com/package/mobx)
- Server, CRUD & Data Transport: [Feathers](https://www.npmjs.com/package/feathers)
- Styling: [PostCSS](https://www.npmjs.com/package/postcss) & [React CSS Modules](https://www.npmjs.com/package/react-css-modules)
- Live Browser Syncing: [BrowserSync](https://www.npmjs.com/package/browser-sync)

## Bundler & Styleguide

- [Babel](https://www.npmjs.com/package/babel)
- [Webpack](https://www.npmjs.com/package/webpack)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Airbnb Code Rules](https://www.npmjs.com/package/eslint-config-airbnb)

---

# Quick Setup

> Run a local MongoDB instance (port 27017) before start the server.
[Install MongoDB](https://docs.mongodb.org/manual/administration/install-community/)

#### ENV: Development

`npm install`

> Run each script in different terminals.

`npm run api:dev`

`npm run web:dev`

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

---

## Read More

If you want more info about how to do better state management with MobX using the React Context in your React Router app, take a look at my article [State Management and Hydration with MobX](https://medium.com/@foxhound87/state-management-hydration-with-mobx-we-must-react-ep-05-1922a72453c6), it also explains how to enable server side rendering functionalities.

## TODO

- Reduce Dependencies

## Credits

Thanks to [Eric John Juta](https://github.com/rej156) for his contribution about the **Hot-Reloadable MobX Stores** implementation.

## Contributing

If you like this stack, don't forget to star the repo!

If you want to contribute to the development, do not hesitate to contact me.
