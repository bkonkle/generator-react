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
yarn global add @bkonkle/generator-react
```

You can also use npm:

```sh
npm install -g @bkonkle/generator-react
```

## Usage

### Yeoman

First, you'll need to install Yeoman to use this generator.

```sh
yarn global add yo
```

### Web

To bootstrap a React web project, use the `web` generator:

```sh
mkdir my-new-web-project
cd my-new--web-project

yo @bkonkle/react:web
```

### Mobile

To bootstrap a React Native mobile project, use the `mobile` generator:

```sh
mkdir my-new-mobile-project
cd my-new--mobile-project

yo @bkonkle/react:mobile
```

### GraphQL

To bootstrap a GraphQL Api based on Postgraphile, use the `graphql` generator:

```sh
mkdir my-new-graphql-project
cd my-new--graphql-project

yo @bkonkle/react:graphql
```

Answer the questions, and you'll have a brand new web application set up in your current directory. Tada! 🎉
