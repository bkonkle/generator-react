# <%= name %>
<% if (description) { %>
<%= description %>
<% } %>
## Overview

This is a [React](https://facebook.github.io/react/) project built with [React Native](https://facebook.github.io/react-native/), [Expo](https://expo.io/) and [TypeScript](https://www.typescriptlang.org/).

State management is handled with [Redux](http://redux.js.org/). Routing is handled with [React Navigation](https://reactnavigation.org/).

## Installation

Use [Yarn](https://yarnpkg.com/en/) to install dependencies:

```sh
$ yarn
```

## Local Development

Several Yarn scripts are included to manage the local development environment. Run them by using the `yarn run` command, like this:

```sh
$ yarn run dev
```

* `ios` - Run the iOS simulator.
* `android` - Run the Android simulator.
* `lint` - Run the tests with tslint.
* `check.types` - Check the types with TypeScript.
* `test` - Run the tests with Jest.
* `test.watch` - Run the tests with Jest in watch mode.

## Copyright

Copyright <% year %> <% author %>
