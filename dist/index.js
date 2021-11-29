"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Address_1 = __importDefault(require("./lib/Address"));
const Crypto_1 = __importDefault(require("./lib/Crypto"));
class libox {
    constructor() {
        this.Address = new Address_1.default();
        this.Crypto = new Crypto_1.default();
    }
    async init() {
        await this.Address.init();
    }
}
module.exports = libox;
//# sourceMappingURL=index.js.map