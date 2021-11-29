let liboxSdk = require("../../dist/index");
let libauth = require("@bitauth/libauth");
let libox = new liboxSdk();

beforeAll(async () => {
  await libox.init();
});

function removePrefix(address) {
  return address.split(":")[1];
}

//
describe("Detect address format(detectAddressFormat)", () => {
  let fun = (...arg) => libox.Address.detectAddressFormat(...arg);
  it("cashaddr", () => {
    let address = "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s";
    // w prefix
    expect(fun(address)).toBe("cashaddr");
    // w/ no prefix
    expect(fun(removePrefix(address))).toBe("cashaddr");
  });

  it("legacy", () => {
    expect(fun("1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74")).toBe("legacy");
  });
});

//
describe("Detect address network (detectAddressNetwork)", () => {
  let fun = (...arg) => libox.Address.detectAddressNetwork(...arg);
  it("mainnet", () => {
    let address = "bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s";
    let addressLegacy = "12gLdGD5q5KdWViDtq3MouheF9PJr8HmB1";
    // w prefix
    expect(fun(address)).toBe("mainnet");
    // w/ no prefix
    //expect(fun(removePrefix(address))).toBe("mainnet");
    // address legacy
    expect(fun(addressLegacy)).toBe("mainnet");
  });

  it("testnet", () => {
    let address = "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy";
    let addressLegacy = "qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy";
    // w prefix
    expect(fun(address)).toBe("testnet");
    // w/ no prefix
    expect(fun(removePrefix(address))).toBe("testnet");
    // address legacy
    expect(fun(addressLegacy)).toBe("testnet");
  });
});

//
describe("Detect address type (detectAddressType)", () => {
  let fun = (...arg) => libox.Address.detectAddressType(...arg);
  it("p2sh", () => {
    let address = "bitcoincash:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl";
    let addressLegacy = "3G6hP41sgvdhCygXn5SJ8ZnKFJyRP49wQ7";
    // w prefix
    expect(fun(address)).toBe("p2sh");
    // w/ no prefix
    expect(fun(removePrefix(address))).toBe("p2sh");
    // address legacy
    expect(fun(addressLegacy)).toBe("p2sh");
  });

  it("p2pkh", () => {
    let address = "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy";
    let addressLegacy = "mqc1tmwY2368LLGktnePzEyPAsgADxbksi";
    // w prefix
    expect(fun(address)).toBe("p2pkh");
    // w/ no prefix
    expect(fun(removePrefix(address))).toBe("p2pkh");
    // address legacy
    expect(fun(addressLegacy)).toBe("p2pkh");
  });
});

//
describe("Detect an addess from an OutputScript (fromOutputScript)", () => {
  let fun = (...arg) => libox.Address.fromOutputScript(...arg);
  it("fromOutputScript", () => {
    // get output script from hex
    let outputScript = Buffer.from(
      libauth.hexToBin("a9149e0c43e304fd71d6b78404efd7eea0f5c6d91a1087")
    );
    // result address
    let mainnet_address =
      "bitcoincash:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl";
    let testnet_address = "bchtest:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqh2hmtpyr";
    // mainnet network
    expect(fun(outputScript)).toBe(mainnet_address);
    // testnet network
    expect(fun(outputScript, "testnet")).toBe(testnet_address);
  });
});

//
describe("Generates an address for an extended public key (fromXPub)", () => {
  let fun = (...arg) => libox.Address.fromXPub(...arg);
  it("mainnet", () => {
    // extended public key
    let xpub =
      "xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA";
    // test value
    expect(fun(xpub)).toBe(
      "bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh"
    );
  });
  it("testnet", () => {
    // extended public key
    let xpub =
      "tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh";
    // test value
    expect(fun(xpub, "0/4")).toBe(
      "bchtest:qq322ataqeas4n0pdn4gz2sdereh5ae43ylk4qdvus"
    );
  });
});

//
describe("Convert hash160 to cash address (hash160ToCash)", () => {
  let fun = (...arg) => libox.Address.hash160ToCash(...arg);
  it("mainnet", () => {
    // mainnet
    expect(fun("573d93b475be4f1925f3b74ed951201b0147eac1")).toBe(
      "bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh"
    );
    expect(fun("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)).toBe(
      "bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug"
    );
    expect(fun("155187a3283b08b30519db50bc23bbba9f4b6657", 0x06f)).toBe(
      "bchtest:qq24rpar9qas3vc9r8d4p0prhwaf7jmx2u22nzt946"
    );
  });
});

//
it("Convert hash160 to legacy address (hash160ToLegacy)", () => {
  let fun = (...arg) => libox.Address.hash160ToLegacy(...arg);
  // mainnet
  expect(fun("573d93b475be4f1925f3b74ed951201b0147eac1")).toBe(
    "18xHZ8g2feo4ceejGpvzHkvXT79fi2ZdTG"
  );
  expect(fun("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)).toBe(
    "3DA6RBcFgLwLTpnF6BRAee8w6a9H6JQLCm"
  );
  expect(fun("155187a3283b08b30519db50bc23bbba9f4b6657", 0x06f)).toBe(
    "mhTg9sgNgvAGfmJs192oUzQWqAXHH5nqLE"
  );
});

//
it("Detect if cashAddr encoded address (isCashAddress)", () => {
  let fun = (...arg) => libox.Address.isCashAddress(...arg);
  // mainnet cashaddr
  expect(
    fun("bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")
  ).toBeTruthy();

  // mainnet w/ no cashaddr prefix
  expect(fun("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")).toBeTruthy();

  // mainnet legacy
  expect(fun("18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj")).toBeFalsy();
});

//
it("Detect if address encoded hash160 (isHash160)", () => {
  let fun = (...arg) => libox.Address.isHash160(...arg);
  // mainnet cashaddr
  expect(
    fun("bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")
  ).toBeFalsy();

  // mainnet w/ no cashaddr prefix
  expect(fun("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")).toBeFalsy();

  // mainnet legacy
  expect(fun("428df38e23fc879a25819427995c3e6355b12d33")).toBeTruthy();
});

//
it("Detect if cashAddr encoded address (isLegacyAddress)", () => {
  let fun = (...arg) => libox.Address.isLegacyAddress(...arg);
  // mainnet cashaddr
  expect(
    fun("bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")
  ).toBeFalsy();

  // mainnet w/ no cashaddr prefix
  expect(fun("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")).toBeFalsy();

  // mainnet legacy
  expect(fun("18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj")).toBeTruthy();
});

//
it("Detect if mainnet address (isMainnetAddress)", () => {
  let fun = (...arg) => libox.Address.isMainnetAddress(...arg);

  // mainnet cashaddr
  expect(
    fun("bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")
  ).toBeTruthy();

  // testnet legacy
  expect(fun("mqc1tmwY2368LLGktnePzEyPAsgADxbksi")).toBeFalsy();

  // testnet w/ no cashaddr prefix
  expect(fun("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy")).toBeFalsy();
});

//
it("Detect if cashAddr encoded address (isP2PKHAddress)", () => {
  let fun = (...arg) => libox.Address.isP2PKHAddress(...arg);
  // mainnet cashaddr
  expect(
    fun("bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")
  ).toBeTruthy();

  // mainnet w/ no cashaddr prefix
  expect(fun("pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl")).toBeFalsy();

  // mainnet legacy
  expect(fun("3G6hP41sgvdhCygXn5SJ8ZnKFJyRP49wQ7")).toBeFalsy();
});

//
it("Detect if cashAddr encoded address (isP2SHAddress)", () => {
  let fun = (...arg) => libox.Address.isP2SHAddress(...arg);
  // mainnet cashaddr
  expect(
    fun("bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")
  ).toBeFalsy();

  // mainnet w/ no cashaddr prefix
  expect(fun("pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl")).toBeTruthy();

  // mainnet legacy
  expect(fun("3G6hP41sgvdhCygXn5SJ8ZnKFJyRP49wQ7")).toBeTruthy();
});

//
it("Detect if cashAddr encoded address (isRegTestAddress)", () => {
  let fun = (...arg) => libox.Address.isRegTestAddress(...arg);
  // mainnet cashaddr
  expect(fun("bchreg:qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh")).toBeTruthy();

  // mainnet w/ no cashaddr prefix
  expect(fun("qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh")).toBeTruthy();

  // mainnet legacy
  expect(fun("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy")).toBeFalsy();
});

//
it("Detect if cashAddr encoded address (isTestnetAddress)", () => {
  let fun = (...arg) => libox.Address.isTestnetAddress(...arg);
  // testnet cashaddr
  expect(fun("qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy")).toBeTruthy();

  // mainnet w/ no cashaddr prefix
  expect(fun("qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s")).toBeFalsy();

  // testnet legacy
  expect(fun("mqc1tmwY2368LLGktnePzEyPAsgADxbksi")).toBeTruthy();
});

//
describe("Convert legacy to cashAddress format (toLegacyAddress)", () => {
  let fun = (e) => libox.Address.toLegacyAddress(e);
  it("main net", () => {
    // example
    let cashAddress = "bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl";
    let legacyAddress = "1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN";
    // w/ prefix
    expect(fun(cashAddress)).toBe(legacyAddress);
    // w/ no prefix
    expect(fun(removePrefix(cashAddress))).toBe(legacyAddress);
  });
  it("test net", () => {
    // example
    let cashAddress = "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy";
    let legacyAddress = "mqc1tmwY2368LLGktnePzEyPAsgADxbksi";
    // w/ prefix
    expect(fun(cashAddress)).toBe(legacyAddress);
    // w/ no prefix
    expect(fun(removePrefix(cashAddress))).toBe(legacyAddress);
  });
  it("bchreg net", () => {
    // example
    let cashAddress = "bchreg:qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh";
    let legacyAddress = "msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx";
    // w/ prefix
    expect(fun(cashAddress)).toBe(legacyAddress);
    // w/ no prefix
    expect(fun(removePrefix(cashAddress))).toBe(legacyAddress);
  });
});

//
describe("Convert cashaddr to legacy address format (toCashAddress)", () => {
  let fun = (...arg) => libox.Address.toCashAddress(...arg);
  it("main net", () => {
    // example
    let cashAddress = "bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl";
    let legacyAddress = "1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN";
    // w/ prefix
    expect(fun(legacyAddress)).toBe(cashAddress);
    // w/ no prefix
    expect(fun(legacyAddress, false)).toBe(removePrefix(cashAddress));
  });
  it("test net", () => {
    // example
    let cashAddress = "bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy";
    let legacyAddress = "mqc1tmwY2368LLGktnePzEyPAsgADxbksi";
    // w/ prefix
    expect(fun(legacyAddress)).toBe(cashAddress);
    // w/ no prefix
    expect(fun(legacyAddress, false)).toBe(removePrefix(cashAddress));
  });
  it("bchreg net", () => {
    // example
    let cashAddress = "bchreg:qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh";
    let legacyAddress = "msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx";
    // w/ prefix
    expect(fun(legacyAddress, true, true)).toBe(cashAddress);
    // w/ no prefix
    expect(fun(legacyAddress, false, true)).toBe(removePrefix(cashAddress));
  });
});
