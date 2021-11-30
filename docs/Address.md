# Address

### `toLegacyAddress`

Converting cashaddr to legacy address format

#### Arguments

1.  address `string` cashaddr address to be converted

#### Result

legacyAddress `string` legacy base 58 check encoded address

#### Examples

```js
// mainnet w/ prefix
lbox.Address.toLegacyAddress(
  "bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl"
);
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// mainnet w/ no prefix
lbox.Address.toLegacyAddress("qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl");
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// testnet w/ prefix
lbox.Address.toLegacyAddress(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi

// testnet w/ no prefix
lbox.Address.toLegacyAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// mqc1tmwY2368LLGktnePzEyPAsgADxbksi
```

### `toCashAddress`

Converting legacy to cashAddress format

#### Arguments

1.  address `string` required: legacy address to be converted
2.  prefix `boolean` optional: include prefix
3.  regtest `boolean` optional: return regtest address

#### Result

cashAddress `string` cashAddr encoded address

#### Examples

```js
// mainnet
lbox.Address.toCashAddress("1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN");
// bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// mainnet no prefix
lbox.Address.toCashAddress("1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN", false);
// qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

// tesnet
lbox.Address.toCashAddress("msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx");
// bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3

// testnet no prefix
lbox.Address.toCashAddress("msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx", false);
// qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
```

### `isLegacyAddress`

Detect if legacy base58check encoded address

#### Arguments

1.  address `string`: address to determine

#### Result

isLegacyAddress `boolean`: true/false if legacy address

#### Examples

```js
// cashaddr
lbox.Address.isLegacyAddress(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// false

// w/ no cashaddr prefix
lbox.Address.isLegacyAddress("qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl");
// false

// legacy
lbox.Address.isLegacyAddress("1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN");
// true

// testnet w/ cashaddr prefix
lbox.Address.isLegacyAddress(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// false

// testnet w/ no cashaddr prefix
lbox.Address.isLegacyAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// false

// legacy testnet
lbox.Address.isLegacyAddress("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// true
```

### `isCashAddress`

Detect if cashAddr encoded address

#### Arguments

1.  address `string`: address to determine

#### Result

isCashAddress `boolean`: true/false if cashaddress

#### Examples

```js
// mainnet cashaddr
lbox.Address.isCashAddress(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// true

// mainnet w/ no cashaddr prefix
lbox.Address.isCashAddress("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// true

// mainnet legacy
lbox.Address.isCashAddress("18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj");
// false

// testnet w/ cashaddr prefix
lbox.Address.isCashAddress(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// true

// testnet w/ no cashaddr prefix
lbox.Address.isCashAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// true

// testnet legacy
lbox.Address.isCashAddress("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// false
```

### `isMainnetAddress`

Detect if mainnet address

#### Arguments

1.  address `string`: address to determine

#### Result

isMainnetAddress `boolean`: true/false if mainnet address

#### Examples

```js
// mainnet cashaddr
lbox.Address.isMainnetAddress(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// true

// mainnet cashaddr w/ no prefix
lbox.Address.isMainnetAddress("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// true

// mainnet legacy
lbox.Address.isMainnetAddress("14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M");
// true

// testnet cashaddr
lbox.Address.isMainnetAddress(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// false

// testnet w/ no cashaddr prefix
lbox.Address.isMainnetAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// false

// testnet legacy
lbox.Address.isMainnetAddress("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// false
```

### `isTestnetAddress`

Detect if testnet address

#### Arguments

1.  addresss `string`: address to determine

#### Result

isTestnetAddresss `boolean`: true/false if is testnet address

#### Examples

```js
// cashaddr mainnet
lbox.Address.isTestnetAddress(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
//false

// w/ no cashaddr prefix
lbox.Address.isTestnetAddress("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// false

// legacy mainnet
lbox.Address.isTestnetAddress("14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M");
// false

// cashaddr testnet
lbox.Address.isTestnetAddress(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// true

// testnet w/ no cashaddr prefix
lbox.Address.isTestnetAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// true

// testnet legacy
lbox.Address.isTestnetAddress("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// true
```

### `isRegTestAddress`

Detect if regtest address

#### Arguments

1.  addresss `string`: address to determine

#### Result

isRegtestAddresss `boolean`: true/false if is regtest address

#### Examples

```js
// regtest
lbox.Address.isRegTestAddress(
  "bchreg:qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh"
);
// true

// regtest w/ no prefix
lbox.Address.isRegTestAddress("qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh");
// true

// cashaddr mainnet
lbox.Address.isRegTestAddress(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
//false

// w/ no cashaddr prefix
lbox.Address.isRegTestAddress("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// false

// legacy mainnet
lbox.Address.isRegTestAddress("14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M");
// false

// cashaddr testnet
lbox.Address.isRegTestAddress(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// false

// testnet w/ no cashaddr prefix
lbox.Address.isRegTestAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// false
```

### `isP2PKHAddress`

Detect if p2pkh address

#### Arguments

1.  address `string` address to determine

#### Result

isP2PKHAddress `boolean` true/false if is p2pkh address

#### Examples

```js
// cashaddr
lbox.Address.isP2PKHAddress(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// true

// w/ no cashaddr prefix
lbox.Address.isP2PKHAddress("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// true

// legacy
lbox.Address.isP2PKHAddress("14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M");
// true

// legacy testnet
lbox.Address.isP2PKHAddress("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// true

// testnet w/ no cashaddr prefix
lbox.Address.isP2PKHAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// true

// legacy testnet
lbox.Address.isP2PKHAddress("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// true
```

### `isP2SHAddress`

Detect if p2sh address

#### arguments

1.  address `string` address to determine

#### Result

isP2SHAddress `boolean` true/false if is p2sh address

#### Examples

```js
// cashaddr
lbox.Address.isP2SHAddress(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// false

// cashaddr w/ no prefix
lbox.Address.isP2SHAddress("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// false

// legacy
lbox.Address.isP2SHAddress("1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74");
// false

// cashaddr testnet
lbox.Address.isP2SHAddress(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// false

// cashaddr testnet w/ no prefix
lbox.Address.isP2SHAddress("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// false

// legacy testnet
lbox.Address.isP2SHAddress("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// false
```

### `detectAddressFormat`

Detect address format

#### arguments

1.  address `string` address to determine format

#### Result

addressFormat `string` address format

#### Examples

```js
// cashaddr
lbox.Address.detectAddressFormat(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// cashaddr

// cashaddr w/ no prefix
lbox.Address.detectAddressFormat("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// cashaddr

// legacy
lbox.Address.detectAddressFormat("1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74");
// legacy

// cashaddr testnet
lbox.Address.detectAddressFormat(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// cashaddr

// cashaddr testnet w/ no prefix
lbox.Address.detectAddressFormat("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// cashaddr

// legacy testnet
lbox.Address.detectAddressFormat("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// legacy
```

### `detectAddressNetwork`

Detect address network

#### arguments

1.  address `string` address to determine network

#### Result

addressNetwork `string` address network

#### Examples

```js
// cashaddr
lbox.Address.detectAddressNetwork(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// mainnet

// cashaddr w/ no prefix
lbox.Address.detectAddressNetwork("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// mainnet

// legacy
lbox.Address.detectAddressNetwork("1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74");
// mainnet

// cashaddr testnet
lbox.Address.detectAddressNetwork(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// testnet

// cashaddr testnet w/ no prefix
lbox.Address.detectAddressNetwork("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// testnet

// legacy testnet
lbox.Address.detectAddressNetwork("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// testnet
```

### `detectAddressType`

Detect address network

#### arguments

1.  address `string` address to determine network

#### Result

addressNetwork `string` address network

#### Examples

```js
// cashaddr
lbox.Address.detectAddressType(
  "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s"
);
// p2pkh

// cashaddr w/ no prefix
lbox.Address.detectAddressType("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s");
// p2pkh

// legacy
lbox.Address.detectAddressType("1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74");
// p2pkh

// cashaddr testnet
lbox.Address.detectAddressType(
  "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy"
);
// p2pkh

// cashaddr testnet w/ no prefix
lbox.Address.detectAddressType("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy");
// p2pkh

// legacy testnet
lbox.Address.detectAddressType("mqc1tmwY2368LLGktnePzEyPAsgADxbksi");
// p2pkh
```

<br />

> ### <b>importent note before use fromXPub function init lbox with [lbox.init()](../README.md#init-async-function) </b>

<br />

### `fromXPub`

Generates an address for an extended public key (xpub)

#### Arguments

1.  xpub `string`: extended public key to be used
2.  path `string` **optional**: derivation path of external change address. Default is `0/0`

#### Result

changeAddress `string`: cashaddr encoded change address

#### Examples

```js
const lbox = require("lbox");

async () => {
  await lbox.init();
  // generate 5 mainnet external change addresses for xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA
  let xpub =
    "xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA";
  for (let i = 0; i <= 4; i++) {
    console.log(lbox.Address.fromXPub(xpub, "0/" + i));
  }
  // bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh
  // bitcoincash:qrr2suh9yjsrkl2qp3p967uhfg6u0r6xxsn9h5vuvr
  // bitcoincash:qpkfg4kck99wksyss6nvaqtafeahfnyrpsj0ed372t
  // bitcoincash:qppgmuuwy07g0x39sx2z0x2u8e34tvfdxvy0c2jvx7
  // bitcoincash:qryj8x4s7vfsc864jm0xaak9qfe8qgk245y9ska57l

  // generate 5 testnet external change addresses for tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh
  let xpub =
    "tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh";
  for (let i = 0; i <= 4; i++) {
    console.log(lbox.Address.fromXPub(xpub, "0/" + i));
  }
  // bchtest:qrth8470sc9scek9u0jj2d0349t62gxzdstw2jukl8
  // bchtest:qpm56zc5re0nhms96r7p985aajthp0vxvg6e4ux3kc
  // bchtest:qqtu3tf6yyd73ejhk3a2ylqynpl3mzzhwuzt299jfd
  // bchtest:qzd7dvlnfukggjqsf5ju0qqwwltakfumjsck33js6m
  // bchtest:qq322ataqeas4n0pdn4gz2sdereh5ae43ylk4qdvus
};
```

<br />

> ### <b>importent note before use fromXPub function init lbox with [lbox.init()](../README.md#init-async-function) </b>

<br />

### `fromXPriv`

Generates an address for an extended private key (xpriv)

#### Arguments

1.  xpriv `string`: extended private key to be used
2.  path `string` **optional**: derivation path of change address. Default is `0'/0`

#### Result

changeAddress `string`: cashaddr encoded change address

#### Examples

```js
const lbox = require("lbox");

(async () => {
  await lbox.init();
  // generate 5 mainnet addresses for xprvA2WwD9mk1Qd3rMjQ4ZRHvCWCj47jbXjY9Nf7npNRBmGUJngpRAvJzNpNgt7h2dDQ5huG7yFwYfz4PFJDPzkqfvBNPHnaio4yAbbUuv3EBnL
  let xpriv =
    "xprvA2WwD9mk1Qd3rMjQ4ZRHvCWCj47jbXjY9Nf7npNRBmGUJngpRAvJzNpNgt7h2dDQ5huG7yFwYfz4PFJDPzkqfvBNPHnaio4yAbbUuv3EBnL";
  for (let i = 0; i <= 4; i++) {
    console.log(lbox.Address.fromXPriv(xpriv, "0'/" + i));
  }
  // bitcoincash:qpmcs78tpfvfphhedcczydaddu5wmcx0xvrwf3fjph
  // bitcoincash:qppfr7fu4dzxguen85rjwa6ress3sl839qyudganxj
  // bitcoincash:qpuaaaseccxyjj04d2l3qv4vd2wxj6gtwvnfe3ckh8
  // bitcoincash:qp46n7a53jvkarp9ps595fjv8czfd045v5zk4xhspm
  // bitcoincash:qprjdqx7cnrac4uemp2fza08k875wsgzfcapk76n9n

  // generate 5 testnet addresses for tprv8jBszV65QgT8TAxvj8Go5r8C3BXwq3mYUvaEfEnsfjkx6PRuQYG4W8Bpc4HM2zbiT9S384shi2Zrr6qxXD6nUySxuvztP9o25hLuMcDvMYD
  let xpriv =
    "tprv8jBszV65QgT8TAxvj8Go5r8C3BXwq3mYUvaEfEnsfjkx6PRuQYG4W8Bpc4HM2zbiT9S384shi2Zrr6qxXD6nUySxuvztP9o25hLuMcDvMYD";
  for (let i = 0; i <= 4; i++) {
    console.log(lbox.Address.fromXPub(xpriv, "0'/" + i));
  }
  // bchtest:qpmcs78tpfvfphhedcczydaddu5wmcx0xv8udkt9xt
  // bchtest:qppfr7fu4dzxguen85rjwa6ress3sl839qqwf0lypw
  // bchtest:qpuaaaseccxyjj04d2l3qv4vd2wxj6gtwvhmak6psm
  // bchtest:qp46n7a53jvkarp9ps595fjv8czfd045v5xy3p48x8
  // bchtest:qprjdqx7cnrac4uemp2fza08k875wsgzfcenjecyz0
})();
```

### `fromOutputScript`

Detect an addess from an OutputScript.

#### Arguments

1.  scriptPubKey `Buffer`: scriptPubKey
2.  network `string` **optional**: defaults to "mainnet"

#### Result

changeAddress `string`: cashaddr encoded change address

#### Examples

```js
const script = lbox.Script.encode([
  Buffer.from("BOX", "ascii"),
  lbox.Script.opcodes.OP_CAT,
  Buffer.from("lbox", "ascii"),
  lbox.Script.opcodes.OP_EQUAL,
]);
const p2sh_hash160 = lbox.Crypto.hash160(script);
const scriptPubKey = lbox.Script.scriptHash.output.encode(p2sh_hash160);

// mainnet address from output script
lbox.Address.fromOutputScript(scriptPubKey);
// bitcoincash:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl

// testnet address from output script
lbox.Address.fromOutputScript(scriptPubKey, "testnet");
// bchtest:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqh2hmtpyr
```

### `isHash160`

Detect if an addess is a hash160.

#### Arguments

1.  address `string`: address

#### Result

isHash160 `boolean`: true/false if address is hash160

#### Examples

```js
let hash160Address = "428df38e23fc879a25819427995c3e6355b12d33";
lbox.Address.isHash160(hash160Address);
// true

let notHash160Address =
  "bitcoincash:pz8a837lttkvjksg0jjmmulqvfkgpqrcdgufy8ns5s";
lbox.Address.isHash160(notHash160Address);
// false
```

### `legacyToHash160`

Convert legacy address to hash160.

#### Arguments

1.  address `string`: legacy address

#### Result

hash160 `string`: hash160

#### Examples

```js
// legacy mainnet p2pkh
lbox.Address.legacyToHash160("18xHZ8g2feo4ceejGpvzHkvXT79fi2ZdTG");
// 573d93b475be4f1925f3b74ed951201b0147eac1

// legacy mainnet p2sh
lbox.Address.legacyToHash160("3DA6RBcFgLwLTpnF6BRAee8w6a9H6JQLCm");
// 7dc85da64d1d93ef01ef62e0221c02f512e3942f

// legacy testnet p2pkh
lbox.Address.legacyToHash160("mhTg9sgNgvAGfmJs192oUzQWqAXHH5nqLE");
// 155187a3283b08b30519db50bc23bbba9f4b6657
```

### `cashToHash160`

Convert cash address to hash160.

#### Arguments

1.  address `string`: cash address

#### Result

hash160 `string`: hash160

#### Examples

```js
// cash address mainnet p2pkh
lbox.Address.cashToHash160(
  "bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh"
);
// 573d93b475be4f1925f3b74ed951201b0147eac1

// cash address mainnet p2sh
lbox.Address.cashToHash160(
  "bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug"
);
// 7dc85da64d1d93ef01ef62e0221c02f512e3942f

// cash address testnet p2pkh
lbox.Address.cashToHash160(
  "bchtest:qq24rpar9qas3vc9r8d4p0prhwaf7jmx2u22nzt946"
);
// 155187a3283b08b30519db50bc23bbba9f4b6657
```

### `hash160ToLegacy`

Convert hash160 to legacy address.

#### Arguments

1.  hash160 `string`: hash160
2.  network `number` **optional**

#### Result

legacyAddress `string`: the address in legacy format

#### Examples

```js
// legacy mainnet p2pkh
lbox.Address.hash160ToLegacy("573d93b475be4f1925f3b74ed951201b0147eac1");
// 18xHZ8g2feo4ceejGpvzHkvXT79fi2ZdTG

// legacy mainnet p2sh
lbox.Address.hash160ToLegacy("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05);
// 3DA6RBcFgLwLTpnF6BRAee8w6a9H6JQLCm

// legacy testnet p2pkh
lbox.Address.hash160ToLegacy("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f);
// mhTg9sgNgvAGfmJs192oUzQWqAXHH5nqLE
```

### `hash160ToCash`

Convert hash160 to cash address.

#### Arguments

1.  hash160 `string`: hash160
2.  network `number` **optional**

#### Result

cashAddress `string`: the address in cash format

#### Examples

```js
lbox.Address.hash160ToCash("573d93b475be4f1925f3b74ed951201b0147eac1");
("bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh");
lbox.Address.hash160ToCash("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05);
("bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug");
lbox.Address.hash160ToCash("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f);
("bchtest:qq24rpar9qas3vc9r8d4p0prhwaf7jmx2u22nzt946");
```
