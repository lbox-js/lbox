let liboxSdk = require("../dist/index");
let libox = new liboxSdk();

describe("check class value", () => {
  it("check .Address", () => {
    expect(typeof libox.Address).toEqual("object");
  });
  it("check .Crypto", () => {
    expect(typeof libox.Crypto).toEqual("object");
  });
});
