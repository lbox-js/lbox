import Address from "./lib/Address";
import Crypto from "./lib/Crypto";
class libox {
  async init() {
    await this.Address.init();
  }

  Address: Address = new Address();

  Crypto: Crypto = new Crypto();
}

export = libox;
