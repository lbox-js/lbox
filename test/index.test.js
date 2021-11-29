let liboxSdk = require("../dist/index");
let libox = new liboxSdk();

describe("Filter function", () => {
  test("check class", () => {
    expect(typeof libox.Address).toEqual("object");
  });
});
