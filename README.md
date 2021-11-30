# Lbox (alpha)

<div align="center">
  <img src="logo.svg" height="120" align="center" />
</div>

<br />

> library use libauth with bitbox syntax

## Installation

Add `Lbox` to your existing Node.js project.

with npm :

```bash
npm i lbox
```

or with yarn:

```bash
yarn add lbox
```

## Used with node

```js
const lbox = require("lbox");
```

## How to use Lbox

### note

- this library is not complete and we are developing it
- now we just support lbox.Address
- before using `lbox.Address.fromXPub` or `lbox.Address.fromXPriv` you need to make compelled asm code in libauth with `init()`

## API

### `init()` (async function)

<br>

```js
const LBOX = require("lbox");
let lbox = new lbox();

let address = lbox.Address.isMainnetAddress(
  "bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug"
);

console.log(address);
// true
```

### [`Address()`](docs/Address.md)
