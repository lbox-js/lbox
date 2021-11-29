import Address from "./lib/Address";

class libox {
  constructor() {
    this.Address = new Address();
  }
  async init() {
    await this.Address.init();
  }

  Address: Address;
}

export = libox;
