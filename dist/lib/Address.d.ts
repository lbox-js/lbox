/// <reference types="node" />
import * as libauth from "@bitauth/libauth";
declare class Address {
    private instantiateSha256;
    private instantiateBIP32Crypto;
    private getCashPrefix;
    private hexAddressType;
    private cashAddressTypes;
    init(): Promise<void>;
    detectAddressFormat(address: string): string;
    detectAddressNetwork(address: string): "mainnet" | "testnet" | "regtest";
    detectAddressType(address: string): string;
    fromOutputScript(scriptPubKey: Buffer, network?: string): string | libauth.AddressContents;
    fromXPub(xpub: string, path?: string): string;
    hash160ToCash(hex?: string, network?: number): string;
    hash160ToLegacy(hex?: string, network?: number): string;
    isCashAddress(address: string): boolean;
    isHash160(hash: string): boolean;
    isLegacyAddress(address: string): boolean;
    isMainnetAddress(address: string): boolean;
    isP2PKHAddress(address: string): boolean;
    isP2SHAddress(address: string): boolean;
    isRegTestAddress(address: string): boolean;
    isTestnetAddress(address: string): boolean;
    toCashAddress(address: string, prefix?: boolean, regtest?: boolean): string;
    toLegacyAddress(cashAddress: string): string;
    cashToHash160(address: string): string;
    legacyToHash160(address: string): string;
}
export default Address;
