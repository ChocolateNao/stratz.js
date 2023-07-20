# stratz.js

<div align="center">
  <a href="https://github.com/ChocolateNao/stratz.js">
    <img src="https://img.shields.io/github/release/ChocolateNao/stratz.js.svg" /></a>
  <a href="https://www.npmjs.com/package/stratz.js">
    <img src="https://camo.githubusercontent.com/0d1fa0bafb9d3d26ac598799ca1d0bf767fc28a41d3f718d404433b392b9a5cd/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f74797065732f73637275622d6a732e737667" /></a>
  <a href="https://github.com/ChocolateNao/stratz.js">
    <img src="https://img.shields.io/github/license/ChocolateNao/stratz.js.svg" /></a>
</div>

<div align="center">
  <a href="https://github.com/ChocolateNao/stratz.js/blob/master/DOCS.md">
    <b>Documentation</b></a>
  <b>|</b>
  <a href="https://www.npmjs.com/package/stratz.js">
      <b>NPM</b></a>
  <b>|</b>
  <i class="fab fa-github"></i>
  <a href="https://github.com/ChocolateNao/stratz.js">
      <b>GitHub</b></a>
  <b>|</b>
  <a href="https://stratz.com/api">
      <b>STRATZ</b></a>
</div>

## About

<a href="https://stratz.com"><img src="https://stratz.com/images/stratz_knowledge_graph_logo.png" align="right" width="200px"/></a>
A Minimalistic Node.js STRATZ REST API Wrapper.  

- Covers 100% of the 36 [STRATZ REST API](https://docs.stratz.com/index.html) endpoints.
- 0 dependencies.
- Promise-based.
- Fully documented and tested.

### Features

- A Variety of Game Data Depending on Different Game Versions, Incuding:
  - Heroes
  - Abilities
  - Items
  - Game Versions
- Player and Match Data by Steam ID.

- eSports Leagues Data, Including:
  - Tournaments
  - Players
  - Matches
- Query Search

## Installation

**Node.js 16 or newer is required.**

```bash
npm install stratz.js
```

## Example

Firstly, create an instance of the main class:  
*Note: This requires an API key. You can get yours for free at [STRATZ](https://stratz.com/api) website.*

```javascript
const { Stratz } = require('stratz.js');
// this library supports both CJS and ESM modules:
// import { Stratz } from 'stratz.js';

const apiToken = 'YOUR_API_TOKEN';

const stratz = new Stratz(apiToken);
```

All methods will return a **promise**. Be sure to handle them accordingly, for example:

```javascript
stratz.getPlayer(282424658)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// Will return:
// {
//   identity: {
//     name: 'Voodoo Daddy',
//     feedLevel: 0,
//     emailLevel: 0,
//     ...
//     behaviorScore: 10000,
//     steamAccountId: 282424658,
//     isFollowed: false
//     }
// }
```

## Development

First of all, clone the repository and install dev-dependencies with `npm install` (or `pnpm install` or `yarn`). To run tests, you will need an API key:

```bash
# copy and edit the .env file
cp .env.example .env
nano .env

# launch tests
npm run test
```

## Building

You can create a production version of the library.  
*Note: This will also create a new documentation file.*

```bash
npm run build
```

In case if you want only to either compile or make the documentation file:

```bash
# for documentation
npm run docs

# for compilation
npm run compile
```

## License

[MIT](https://github.com/ChocolateNao/stratz.js/blob/master/LICENSE)  
*This project is not affiliated with STRARZ in any way.*
