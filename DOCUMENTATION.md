# Introduction
With the RFX Stack you can build and run different layer of the app independently. You are also free to change some of its parts as you need.
For this purpose the code is divided in differents compartments:

- api
- seeds
- web
- shared
- utils

This structure does not force you to separate the server-side code from the client-side, as with React and its server side rendering features, these two concepts are more coupled then ever. The **web** directory contains both the server and client code specifically needed for in-browser rendering. The **shared** directory contains code that can be shared, for example, with React Native or Electron in the same project. That's the main goal: provide flexibility and extensibility.

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

# Quick Setup

> Run a local MongoDB instance (port 27017) before start the server.
[Install MongoDB](https://docs.mongodb.org/manual/administration/install-community/)

##### ENV: Development
`npm install`

> Run each script in differents terminal windows while the api server is running.

`npm run api:dev`

`npm run web:dev`

> Run the **seed** app or the **web** app after the **api** app is running.

`npm run seed:dev`

##### ENV: Production

`npm install`

`npm run build:client:web`

`npm run build:server:web`

`npm run build:server:api`

`npm run api:prod`

`npm run web:prod`
