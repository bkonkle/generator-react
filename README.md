# @bkonkle/generator-react

[![npm](https://img.shields.io/npm/v/@bkonkle/generator-react.svg)](https://www.npmjs.com/package/generator-react) [![license](https://img.shields.io/github/license/bkonkle/generator-react.svg)](LICENSE)

```
                                          $$\
                                          $$ |
 $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$$\ $$$$$$\
$$  __$$\ $$  __$$\  \____$$\ $$  _____|\_$$  _|
$$ |  \__|$$$$$$$$ | $$$$$$$ |$$ /        $$ |
$$ |      $$   ____|$$  __$$ |$$ |        $$ |$$\
$$ |      \$$$$$$$\ \$$$$$$$ |\$$$$$$$\   \$$$$  |
\__|       \_______| \_______| \_______|   \____/

```

Brandon's Yeoman generators for scaffolding new React applications

## Installation

```sh
npm install -g @bkonkle/generator-react
```

You can also use yarn if you have your global folder configured:

```sh
yarn global add @bkonkle/generator-react
```

### Yeoman

You'll also need to install Yeoman to use this generator.

```sh
npm i -g yo

(or)

```sh
yarn global add yo
```

## Usage

Run one of the generators below, answer the questions, and you'll have a brand new web application set up in your current directory. Tada! 🎉

### Web

To bootstrap a React web project, use the `web` generator:

```sh
mkdir my-new-web-project
cd my-new-web-project

yo @bkonkle/react:web
```

This results in a build setup adapted from [CRA] to allow prefetching (or even server rendering, if you want) and to support runtime environment variables. It uses a Webpack config adapted from [CRA] with tweaks from [Razzle] and lots of customizations. The dev process is adapted from [Razzle], and it runs a base [Express] process at the requested port, launching the Webpack Dev Server at port + 1 to handle hot reloaded resources. [Apollo] and [Auth0] are optionally included.

You'll get a layout that looks like this (abbreviated):

```
my-new-web-project
├── assets - build resources not exposed to the public
├── scripts - lightweight build tooling adapted from CRA
│    ├── build.ts - build the project for production use
│    ├── dev.ts - run the project in dev mode alongside Webpack Dev Server
│    └── run.ts - run the project in production mode using the built bundle
├── src
│    ├── __tests__ - a stub folder for Jest tests
│    ├── components - components that handle rendering and presentation
│    ├── [data] - (if useApollo is selected) a folder for data-related modules
│    │    ├── [ApiClient.ts] - (if useApollo is selected) code to initialize an Apollo GraphQL client
│    │    └── [AuthClient.ts] - (if useAuth0 is selected) code to initialize Auth0 authentication
│    ├── state - Redux state management using thunks with context, for things like the Apollo client
│    │    ├── [AuthState.ts] - (if useAuth0 is selected) Redux module to manage auth state
│    │    ├── StateTypes.ts - a centralized module for types related to Redux
│    │    └── Store.ts - Redux store initialization and hot reloading code, with thunk context
│    ├── views - views compose components and handle logic and integration
│    │    ├── App.tsx - attaches providers for react-router, Redux, and optionally Apollo
│    │    ├── DummyApp.tsx - attaches dummy providers for rendering things like the error view
│    │    └── Router.tsx - a simple react-router switch view using routes from Routes.tsx
│    ├── BrowserConfig.ts - prepares and loads configs created by Config.ts below for the browser
│    ├── Client.tsx - bootstraps the application in the browser
│    ├── Config.ts - reads the server environment to create a config for the browser
│    ├── Routes.tsx - uses react-router-dom and react-loadable to describe available routes
│    └── Server.ts - the core Express server that builds a BrowserConfig for each request
├── static - static files made available via the Express server
│    └── document.html - a webpack-html-plugin template that Server.ts injects the config into
├── .babelrc - includes TypeScript, Emotion, and other plugins
├── Dockerfile - a simple container that uses "yarn run"
├── tsconfig.json - used by the Babel plugin
├── tslint.json - starts with Microsoft contrib and overrides a lot
└── webpack.config.ts - adapted from CRA with customizations
```

### Mobile

To bootstrap a [React Native] mobile project, use the `mobile` generator:

```sh
mkdir my-new-mobile-project
cd my-new--mobile-project

yo @bkonkle/react:mobile
```

This results in a [React Native] application using [Expo], with [React Navigation] for routing. 

You'll get a layout that looks like this (abbreviated):

```
my-new-mobile-project
├── assets - static resources such as images
├── src
│    ├── __tests__ - a stub folder for Jest tests
│    ├── components - components that handle rendering and presentation
│    ├── [data] - (same as the web generator)
│    ├── screens - screens compose components and handle logic and integration
│    │    └── LoginScreen.tsx - the default route, intended to render a login experience
│    ├── state - (same as the web generator)
│    ├── Config.ts - sets up config values for all environments, then exports the current values
│    ├── Routes.ts - uses react-navigation to describe available screens
│    ├── Theme.ts - some basic app-wide theming tools
│    └── Types.ts - some general types used across the app
├── .babelrc - includes the standard Expo preset
├── App.js - the Expo entry point, which imports the App.tsx component
├── tsconfig.json - (same as the web generator)
└── tslint.json - (same as the web generator)
```

### GraphQL

To bootstrap a GraphQL Api based on Postgraphile, use the `graphql` generator:

```sh
mkdir my-new-graphql-project
cd my-new--graphql-project

yo @bkonkle/react:graphql
```

This results in an [Express] API using [Postgraphile] and [Playground] as middleware.

```
my-new-graphql-project
├── migrations - database schema migrations written in TypeScript and using Knex
├── sql - sql function definitions that are loaded into Postgres
├── src
│    ├── __tests__ - a stub folder for Jest tests
│    ├── utils - assorted utility modules
│    │    └── MigrationUtils.ts - utilities for Knex schema migrations
│    ├── Config.ts - reads the environment and exports various config namespaces
│    ├── Plugins.ts - Postgraphile plugins to extend the GraphQL schema
│    ├── Server.ts - the main Express pipeline with Postgraphile and Playground
│    └── Types.ts - some general types used across the app
├── knexfile.js - Knex schema migration config
├── tsconfig.json - (same as the web generator)
└── tslint.json - (same as the web generator)
```

[CRA]: https://github.com/facebook/create-react-app
[Razzle]: https://github.com/jaredpalmer/razzle
[Express]: https://expressjs.com
[Apollo]: https://www.apollographql.com
[Auth0]: https://auth0.com
[React Native]: https://facebook.github.io/react-native
[Expo]: https://expo.io
[React Navigation]: https://reactnavigation.org
[Postgraphile]: https://www.graphile.org/postgraphile
[Playground]: https://github.com/prisma/graphql-playground
