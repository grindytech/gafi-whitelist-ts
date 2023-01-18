import {encodeAddress} from '@polkadot/keyring';

function hex_to_ss58(address: string, ss58Format: number) {
    let enAdd = encodeAddress("0x" + address, ss58Format);
    return enAdd;
}

module.exports = {
    hex_to_ss58
};
