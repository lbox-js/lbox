import Address from "./lib/Address";
declare class libox {
    constructor();
    init(): Promise<void>;
    Address: Address;
}
export = libox;
