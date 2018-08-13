# gatecoin-ts-client

A Gatecoint API client for browser and Node.js.

## Usage

Install library 

```npm i gatecoin-api-v1 --save```

Create an instance of the client and use it in your code:

```js
import Client from "gatecoin-api-v1";

const client = new Client({
  publicKey: 'your public key',
  privateKey: 'your private key',
});

const response = await client.getOrderBook('BTCEUR');
console.log(response);
```

### Examples

Check out the [examples](examples) for hints on implementing common use-case scenarios.

You can execute the examples by compiling them and running them with `node`:
```bash
npm run build
node dist/examples/examples/get-tickers.js
```

### IE11 support

To use this library in IE11 you'll need to install a couple of polyfills.

`npm i core-js whatwg-fetch --save`

Add them to your project before including the library.

```js
import 'core-js/es6/promise';
import 'core-js/es6/object';
import 'whatwg-fetch';
```

## Development

### Unit tests

Running unit tests:

`npm t`

Coverage report available in `coverage/lcov-report`.

### E2E tests

To run end-to-end tests:
1. Create a `.env` file in the root folder with the following values:

```
BASE_URL=https://api.gtcprojects.com/v1
PUBLIC_KEY=your public key
PRIVATE_KEY=your private key
```

2. Run `npm run test:e2e`

### Build tests

To test the resulting builds:

1. Build the library and register it for linkage:

```bash
npm run build
npm link
```

2. Go to the tests, install dependencies and link the library

```bash
cd test-build
npm i
npm link gatecoin-api-v1
```

3. To test the Node.js build run `npm run test-node`.
4. To test the web build `npm run test-web` and open `http://localhost:10001` in your browser. 

### CI

```bash
docker build .
```

### Publishing

@todo
