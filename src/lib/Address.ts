// import libauth lib to use it
import * as libauth from "@bitauth/libauth";
// import crypto
import { createHash } from "crypto";

function hash(type: string): (input: Uint8Array) => Uint8Array {
  return function (input: Uint8Array) {
    return new Uint8Array([
      ...createHash(type).update(Buffer.from(input)).digest(),
    ]);
  };
}

class Address {
  // # WebAssembly Hashing Functions
  private instantiateSha256: {
    hash: (input: Uint8Array) => Uint8Array;
  } = {
    hash: hash("sha256"),
  };

  private instantiateBIP32Crypto: any;

  // get cash address prefix
  private getCashPrefix(Address: string): string {
    if (Address.split(":").length == 1) {
      let decodeCashAddress = libauth.decodeCashAddressFormatWithoutPrefix(
        Address
      );
      if (typeof decodeCashAddress !== "object")
        throw new Error("This Address not valid");
      return decodeCashAddress.prefix;
    } else {
      return Address.split(":")[0];
    }
  }

  // hash code of
  private hexAddressType: {
    [key: number]:
      | "p2pkh"
      | "p2sh"
      | "p2pkh-testnet"
      | "p2sh-testnet"
      | "p2pkh-copay-bch"
      | "p2sh-copay-bch";
  } = {
    0x00: "p2pkh",
    0x05: "p2sh",
    0x6f: "p2pkh-testnet",
    0xc4: "p2sh-testnet",
    0x1c: "p2pkh-copay-bch",
    0x28: "p2sh-copay-bch",
  };
  // "p2pkh" | "p2sh" | "p2pkh-testnet" | "p2sh-testnet" | "p2pkh-copay-bch" | "p2sh-copay-bch

  private cashAddressTypes: { [key: string]: libauth.CashAddressType } = {
    p2pkh: 0,
    p2sh: 1,
  };

  async init() {
    this.instantiateBIP32Crypto = await libauth.instantiateBIP32Crypto();
  }

  //
  detectAddressFormat(address: string): string {
    if (this.isCashAddress(address)) {
      return "cashaddr";
    } else {
      return "legacy";
    }
  }

  //
  detectAddressNetwork(address: string) {
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
  detectAddressType(address: string) {
    if (address[0] === "x") return "mainnet";
    else if (address[0] === "t") return "testnet";

    let {
      CashAddressType,
      decodeCashAddress,
      Base58AddressFormatVersion,
      decodeBase58Address,
    } = libauth;
    if (this.isCashAddress(address)) {
      address = this.toCashAddress.bind(this)(address);
      let decodedAddress = decodeCashAddress(address);
      if (typeof decodedAddress !== "object") throw new Error(decodedAddress);
      return CashAddressType[decodedAddress.type].toLocaleLowerCase();
    } else {
      let decodedAddress = decodeBase58Address(this.instantiateSha256, address);
      if (typeof decodedAddress !== "object") throw new Error(decodedAddress);
      let type = Base58AddressFormatVersion[decodedAddress.version];
      if (type.endsWith("Testnet")) type = type.slice(0, -7);
      return type;
    }
  }

  //
  fromOutputScript(scriptPubKey: Buffer, network = "mainnet") {
    let prefix: string = "bitcoincash";
    if (network !== "bitcoincash" && network !== "mainnet") {
      prefix = "bchtest";
    }
    return libauth.lockingBytecodeToCashAddress(
      new Uint8Array([...scriptPubKey]),
      prefix
    );
  }

  //
  fromXPub(xpub: string, path: string = "0/0") {
    const crypto = this.instantiateBIP32Crypto;
    const decoded = libauth.decodeHdPublicKey(crypto, xpub);
    if (typeof decoded != "object") throw new Error(decoded);
    const { node, network } = decoded;

    const deriveHD = libauth.deriveHdPath(crypto, node, "M/" + path);
    if (typeof deriveHD != "object") throw new Error(deriveHD);

    return libauth.encodeCashAddress(
      network === "testnet" ? "bchtest" : "bitcoincash",
      0,
      libauth.deriveHdPublicNodeIdentifier(crypto, deriveHD)
    );
  }

  //
  fromXPriv(xpub: string, path: string = "0'/0") {
    const crypto = this.instantiateBIP32Crypto;
    const decoded = libauth.decodeHdPrivateKey(crypto, xpub);
    if (typeof decoded != "object") throw new Error(decoded);
    const { node, network } = decoded;

    const deriveHD = libauth.deriveHdPath(crypto, node, "m/" + path);
    if (typeof deriveHD != "object") throw new Error(deriveHD);

    return libauth.encodeCashAddress(
      network === "testnet" ? "bchtest" : "bitcoincash",
      0,
      libauth.deriveHdPrivateNodeIdentifier(crypto, deriveHD)
    );
  }

  //
  hash160ToCash(hex: string = "", network: number = 0x00) {
    let type: string = libauth.Base58AddressFormatVersion[network] || "p2pkh";
    let prefix = "bitcoincash";
    if (type.endsWith("Testnet")) {
      type = type.slice(0, -7);
      prefix = "bchtest";
    }
    let cashType: libauth.CashAddressType = this.cashAddressTypes[type] || 0;
    return libauth.encodeCashAddress(prefix, cashType, libauth.hexToBin(hex));
  }

  //
  hash160ToLegacy(hex: string = "", network: number = 0x00) {
    return libauth.encodeBase58Address(
      this.instantiateSha256,
      this.hexAddressType[network] || "p2pkh",
      libauth.hexToBin(hex)
    );
  }

  //
  isCashAddress(address: string): boolean {
    if (address.split(":").length == 2) {
      try {
        let decode = libauth.decodeCashAddress(address);
        return typeof decode == "object";
      } catch (e) {}
    } else {
      try {
        let decode_without_prefix = libauth.decodeCashAddressFormatWithoutPrefix(
          address
        );
        return typeof decode_without_prefix == "object";
      } catch (e) {}
    }
    return false;
  }

  //
  isHash160(hash: string) {
    return this.isLegacyAddress(this.hash160ToLegacy(hash));
  }

  //
  isLegacyAddress(address: string): boolean {
    return (
      typeof libauth.decodeBase58Address(this.instantiateSha256, address) ==
      "object"
    );
  }

  //
  isMainnetAddress(address: string): boolean {
    return this.detectAddressNetwork(address) === "mainnet";
  }

  //
  isP2PKHAddress(address: string): boolean {
    return this.detectAddressType(address) == "p2pkh";
  }

  //
  isP2SHAddress(address: string): boolean {
    return this.detectAddressType(address) == "p2sh";
  }

  //
  isRegTestAddress(address: string): boolean {
    return this.detectAddressNetwork(address) === "regtest";
  }

  //
  isTestnetAddress(address: string): boolean {
    return this.detectAddressNetwork(address) === "testnet";
  }

  //
  toCashAddress(address: string, prefix = true, regtest = false): string {
    if (!this.isCashAddress.bind(this)(address)) {
      const sha256 = this.instantiateSha256;

      let decodeAddress = libauth.decodeBase58Address(sha256, address);

      if (typeof decodeAddress != "object") throw new Error("");

      let version = libauth.Base58AddressFormatVersion;
      let decodeData: { prefix: string; type: any; preload: Uint8Array } = {
        prefix: version[decodeAddress.version].endsWith("Testnet")
          ? "bchtest"
          : "bitcoincash",
        type: version[decodeAddress.version],
        preload: decodeAddress.payload,
      };

      if (regtest) decodeData.prefix = "bchreg";

      const cashAddress = libauth.encodeCashAddress(
        decodeData.prefix,
        decodeData.type,
        decodeData.preload
      );

      if (prefix) return cashAddress;
      return cashAddress.split(":")[1];
    } else {
      if (address.split(":").length == 2) {
        let prefix = this.getCashPrefix.bind(this)(address);
        if (prefix) return address;
        return address.split(":")[1];
      } else {
        let prefix = this.getCashPrefix.bind(this)(address);
        if (prefix) return prefix + ":" + address;
        return address;
      }
    }
  }

  //
  toLegacyAddress(cashAddress: string): string {
    let decoded;
    let type: any;
    if (cashAddress.split(":").length == 2) {
      // decode Address with prefix
      decoded = libauth.decodeCashAddress(cashAddress);
      if (typeof decoded != "object") throw new Error(decoded);
      type = libauth.CashAddressType[decoded.type].toLocaleLowerCase();
    } else {
      decoded = libauth.decodeCashAddressFormatWithoutPrefix(cashAddress);
      if (typeof decoded != "object") throw new Error(decoded);
      type = libauth.CashAddressType[decoded.version].toLocaleLowerCase();
    }

    // check if Address from test net
    type = decoded.prefix == "bitcoincash" ? type : type + "-testnet";

    return libauth.encodeBase58Address(
      this.instantiateSha256,
      type,
      decoded.hash
    );
  }

  //
  cashToHash160(address: string) {
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
  legacyToHash160(address: string) {
    const result = libauth.base58AddressToLockingBytecode(
      this.instantiateSha256,
      address
    );

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

export default Address;
