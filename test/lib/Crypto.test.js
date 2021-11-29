let liboxSdk = require("../../dist/index");
let { Crypto } = new liboxSdk();

it("Utility for creating ripemd160(sha256()) hash digests of data (hash160)", () => {
  // input
  let buffer = Buffer.from("0101010101010101", "hex");
  //output
  let result = "abaf1119f83e384210fe8e222eac76e2f0da39dc";
  //
  expect(Crypto.hash160(buffer).toString("hex")).toBe(
    result
  );
});

it("Utility for creating double sha256 hash digests of data (hash256)", () => {
  // input
  let buffer = Buffer.from("0101010101010101", "hex");
  //output
  let result = "728338d99f356175c4945ef5cccfa61b7b56143cbbf426ddd0e0fc7cfe8c3c23";
  //
  expect(Crypto.hash256(buffer).toString("hex")).toBe(
    result
  );
});

it("Generates cryptographically strong pseudo-random data. (randomBytes)", () => {
  // input
  let length = 24;
  //
  expect(Crypto.randomBytes(length).length).toBe(
    length
  );
});


it("Utility for creating ripemd160 hash digests of data (sha256)", () => {
  // input
  let buffer = Buffer.from("0101010101010101", "hex");
  //output
  let result = "04abc8821a06e5a30937967d11ad10221cb5ac3b5273e434f1284ee87129a061";
  //
  expect(Crypto.sha256(buffer).toString("hex")).toBe(
    result
  );
});