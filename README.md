# @bkonkle/generator-react

[![npm](https://img.shields.io/npm/v/generator-react.svg)](https://www.npmjs.com/package/generator-react) [![license](https://img.shields.io/github/license/bkonkle/generator-react.svg)](LICENSE)

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

Currently, my only generator builds a simple React web project with very light server preloading for dynamic environment variables. This will likely be expanded in the future to cover other types of projects as well - including generators for React Native or Electron applications and for API servers to support them.

### Yeoman

First, you'll need to install Yeoman to use this generator.

```sh
yarn global add yo
```

### React

To bootstrap a React web project, use the `web` generator:

```sh
mkdir my-new-web-project
cd my-new--web-project

yo @bkonkle/react:web
```

To bootstrap a React Native mobile project, use the `mobile` generator:

```sh
mkdir my-new-mobile-project
cd my-new--mobile-project

yo @bkonkle/react:mobile
```

Answer the questions, and you'll have a brand new web application set up in your current directory. Tada! 🎉
