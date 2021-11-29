import Address from "./lib/Address";
import Crypto from "./lib/Crypto";
declare class libox {
    init(): Promise<void>;
    Address: Address;
    Crypto: Crypto;
}
export = libox;
