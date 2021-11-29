# Lbox <small style="font-size: small;">alpin</small>

<div style="text-align:center;margin:20px;">
  <img src="logo.svg" height="120" align="center" />
</div>

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
- before using library you need to make compelled asm code in libauth with `init()`

## API

### `init()` (async function)

<br>

```js
const lbox = require("lbox");

(async () => {
  await lbox.init();
  // you can use all library function now
  let address = bchjs.Address.isMainnetAddress(
    "bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug"
  );
  console.log(address);
})();
```

### [`Address()`](docs/Address.md)