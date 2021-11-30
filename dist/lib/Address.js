"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import libauth lib to use it
const libauth = __importStar(require("@bitauth/libauth"));
// import crypto
const crypto_1 = require("crypto");
class Address {
    constructor() {
        // hash code of
        this.hexAddressType = {
            0x00: "p2pkh",
            0x05: "p2sh",
            0x6f: "p2pkh-testnet",
            0xc4: "p2sh-testnet",
            0x1c: "p2pkh-copay-bch",
            0x28: "p2sh-copay-bch",
        };
        // "p2pkh" | "p2sh" | "p2pkh-testnet" | "p2sh-testnet" | "p2pkh-copay-bch" | "p2sh-copay-bch
        this.cashAddressTypes = {
            p2pkh: 0,
            p2sh: 1,
        };
        function hash(type) {
            return function (input) {
                return new Uint8Array([
                    ...(0, crypto_1.createHash)(type).update(Buffer.from(input)).digest(),
                ]);
            };
        }
        this.instantiateSha256 = {
            hash: hash("sha256"),
        };
    }
    // get cash address prefix
    getCashPrefix(Address) {
        if (Address.split(":").length == 1) {
            let decodeCashAddress = libauth.decodeCashAddressFormatWithoutPrefix(Address);
            if (typeof decodeCashAddress !== "object")
                throw new Error("This Address not valid");
            return decodeCashAddress.prefix;
        }
        else {
            return Address.split(":")[0];
        }
    }
    async init() {
        this.instantiateBIP32Crypto = await libauth.instantiateBIP32Crypto();
    }
    //
    detectAddressFormat(address) {
        if (this.isCashAddress(address)) {
            return "cashaddr";
        }
        else {
            return "legacy";
        }
    }
    //
    detectAddressNetwork(address) {
        if (this.isLegacyAddress(address)) {
            address = this.toCashAddress(address);
        }
        let prefix = this.getCashPrefix(address);
        switch (prefix) {
            case "bitcoincash":
                return "mainnet";
            case "bchtest":
                return "testnet";
            case "bchreg":
                return "regtest";
            default:
                throw new Error(`Invalid prefix : ${prefix}`);
        }
    }
    //
    detectAddressType(address) {
        if (address[0] === "x")
            return "mainnet";
        else if (address[0] === "t")
            return "testnet";
        let { CashAddressType, decodeCashAddress, Base58AddressFormatVersion, decodeBase58Address, } = libauth;
        if (this.isCashAddress(address)) {
            address = this.toCashAddress.bind(this)(address);
            let decodedAddress = decodeCashAddress(address);
            if (typeof decodedAddress !== "object")
                throw new Error(decodedAddress);
            return CashAddressType[decodedAddress.type].toLocaleLowerCase();
        }
        else {
            let decodedAddress = decodeBase58Address(this.instantiateSha256, address);
            if (typeof decodedAddress !== "object")
                throw new Error(decodedAddress);
            let type = Base58AddressFormatVersion[decodedAddress.version];
            if (type.endsWith("Testnet"))
                type = type.slice(0, -7);
            return type;
        }
    }
    //
    fromOutputScript(scriptPubKey, network = "mainnet") {
        let prefix = "bitcoincash";
        if (network !== "bitcoincash" && network !== "mainnet") {
            prefix = "bchtest";
        }
        return libauth.lockingBytecodeToCashAddress(new Uint8Array([...scriptPubKey]), prefix);
    }
    //
    fromXPub(xpub, path = "0/0") {
        const crypto = this.instantiateBIP32Crypto;
        const decoded = libauth.decodeHdPublicKey(crypto, xpub);
        if (typeof decoded != "object")
            throw new Error(decoded);
        const { node, network } = decoded;
        const deriveHD = libauth.deriveHdPath(crypto, node, "M/" + path);
        if (typeof deriveHD != "object")
            throw new Error(deriveHD);
        let type = "P2SH";
        return libauth.encodeCashAddress(network === "testnet" ? "bchtest" : "bitcoincash", type, libauth.deriveHdPublicNodeIdentifier(crypto, deriveHD));
    }
    //
    fromXPriv(xpub, path = "0'/0") {
        const crypto = this.instantiateBIP32Crypto;
        const decoded = libauth.decodeHdPrivateKey(crypto, xpub);
        if (typeof decoded != "object")
            throw new Error(decoded);
        const { node, network } = decoded;
        const deriveHD = libauth.deriveHdPath(crypto, node, "m/" + path);
        if (typeof deriveHD != "object")
            throw new Error(deriveHD);
        let type = "P2SH";
        return libauth.encodeCashAddress(network === "testnet" ? "bchtest" : "bitcoincash", type, libauth.deriveHdPrivateNodeIdentifier(crypto, deriveHD));
    }
    //
    hash160ToCash(hex = "", network = 0x00) {
        let type = libauth.Base58AddressFormatVersion[network] || "p2pkh";
        let prefix = "bitcoincash";
        if (type.endsWith("Testnet")) {
            type = type.slice(0, -7);
            prefix = "bchtest";
        }
        let cashType = this.cashAddressTypes[type] || 0;
        return libauth.encodeCashAddress(prefix, cashType, libauth.hexToBin(hex));
    }
    //
    hash160ToLegacy(hex = "", network = 0x00) {
        return libauth.encodeBase58Address(this.instantiateSha256, this.hexAddressType[network] || "p2pkh", libauth.hexToBin(hex));
    }
    //
    isCashAddress(address) {
        if (address.split(":").length == 2) {
            try {
                let decode = libauth.decodeCashAddress(address);
                return typeof decode == "object";
            }
            catch (e) { }
        }
        else {
            try {
                let decode_without_prefix = libauth.decodeCashAddressFormatWithoutPrefix(address);
                return typeof decode_without_prefix == "object";
            }
            catch (e) { }
        }
        return false;
    }
    //
    isHash160(hash) {
        return this.isLegacyAddress(this.hash160ToLegacy(hash));
    }
    //
    isLegacyAddress(address) {
        return (typeof libauth.decodeBase58Address(this.instantiateSha256, address) ==
            "object");
    }
    //
    isMainnetAddress(address) {
        return this.detectAddressNetwork(address) === "mainnet";
    }
    //
    isP2PKHAddress(address) {
        return this.detectAddressType(address) == "p2pkh";
    }
    //
    isP2SHAddress(address) {
        return this.detectAddressType(address) == "p2sh";
    }
    //
    isRegTestAddress(address) {
        return this.detectAddressNetwork(address) === "regtest";
    }
    //
    isTestnetAddress(address) {
        return this.detectAddressNetwork(address) === "testnet";
    }
    //
    toCashAddress(address, prefix = true, regtest = false) {
        if (!this.isCashAddress.bind(this)(address)) {
            const sha256 = this.instantiateSha256;
            let decodeAddress = libauth.decodeBase58Address(sha256, address);
            if (typeof decodeAddress != "object")
                throw new Error("");
            let version = libauth.Base58AddressFormatVersion;
            let decodeData = {
                prefix: version[decodeAddress.version].endsWith("Testnet")
                    ? "bchtest"
                    : "bitcoincash",
                type: version[decodeAddress.version],
                preload: decodeAddress.payload,
            };
            if (regtest)
                decodeData.prefix = "bchreg";
            const cashAddress = libauth.encodeCashAddress(decodeData.prefix, decodeData.type, decodeData.preload);
            if (prefix)
                return cashAddress;
            return cashAddress.split(":")[1];
        }
        else {
            if (address.split(":").length == 2) {
                /*let prefix = this.getCashPrefix.bind(this)(address);
                if (address.split(":").length == 1) address = prefix + ":" + address;
                if (prefix) return address;*/
                let prefix = this.getCashPrefix.bind(this)(address);
                if (prefix)
                    return address;
                return address.split(":")[1];
            }
            else {
                let prefix = this.getCashPrefix.bind(this)(address);
                if (prefix)
                    return prefix + ":" + address;
                return address;
            }
        }
    }
    //
    toLegacyAddress(cashAddress) {
        let decoded;
        let type;
        if (cashAddress.split(":").length == 2) {
            // decode Address with prefix
            decoded = libauth.decodeCashAddress(cashAddress);
            if (typeof decoded != "object")
                throw new Error(decoded);
            type = libauth.CashAddressType[decoded.type].toLocaleLowerCase();
        }
        else {
            decoded = libauth.decodeCashAddressFormatWithoutPrefix(cashAddress);
            if (typeof decoded != "object")
                throw new Error(decoded);
            type = libauth.CashAddressType[decoded.version].toLocaleLowerCase();
        }
        // check if Address from test net
        type = decoded.prefix == "bitcoincash" ? type : type + "-testnet";
        return libauth.encodeBase58Address(this.instantiateSha256, type, decoded.hash);
    }
    //
    cashToHash160(address) {
        const result = libauth.cashAddressToLockingBytecode(address);
        if (typeof result === "string") {
            process.exit();
        }
        const contents = libauth.lockingBytecodeToAddressContents(result.bytecode);
        if (typeof contents === "string") {
            process.exit();
        }
        return libauth.binToHex(contents.payload);
    }
    //
    legacyToHash160(address) {
        const result = libauth.base58AddressToLockingBytecode(this.instantiateSha256, address);
        if (typeof result === "string") {
            process.exit();
        }
        const contents = libauth.lockingBytecodeToAddressContents(result.bytecode);
        if (typeof contents === "string") {
            process.exit();
        }
        return libauth.binToHex(contents.payload);
    }
}
exports.default = Address;
//# sourceMappingURL=Address.js.map