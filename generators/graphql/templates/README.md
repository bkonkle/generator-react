# <%= name %>
<% if (description) { %>
<%= description %>
<% } %>
## Overview

This is an Express-based application server written in TypeScript. It uses GraphQL via [Postgraphile](https://www.graphile.org/) to communicate with the client.

## Installation

### Dependencies

Install dependencies with [Yarn](http://yarnpkg.com):

    $ yarn

This should install the ReasonML and BuckleScript platform to compile the code to JavaScript.

### Local Database

To use Postgres locally:

    $ createuser -s <%= name %>-root
    $ createdb <%= name %> -O <%= name %>-root

## Running the Application

To run the server in development mode:

    $ yarn dev

## Architecture

### Express

The core of the application is an Express server with some middleware:

* [body-parser](https://github.com/expressjs/body-parser)
* [cors](https://github.com/expressjs/cors)
