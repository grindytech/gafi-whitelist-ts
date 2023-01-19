import { Keyring } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
import { IWhitelist } from '../types';
import { read_whitelist, write_whitelist } from './fs.service';

const SOURCE = "src/services/test";
var WL: IWhitelist;

describe('Utils', () => {
    beforeEach(async () => {
        await cryptoWaitReady();
    });

    it('should write whitelist', async () => {
        const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

        let id = genRanHex(64);
        const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });

        let address = [];
        for (let i = 0; i < 2; i++) {
            let seed = mnemonicGenerate();
            const pair = keyring.addFromUri(seed, { name: 'key pair' }, 'sr25519');
            const addr_hex = "0x" + u8aToHex(pair.publicKey, undefined, false);
            address.push(addr_hex);
        }

        let input: IWhitelist = {
            id: id,
            whitelist: address,
        }

        await write_whitelist(SOURCE, input);
        await new Promise((r) => setTimeout(r, 1000));
        let wl = await read_whitelist(SOURCE, input.id);
        expect(wl).toEqual(input);
        WL = input;
    })

    it('should read whitelist', async () => {
        let wl = await read_whitelist(SOURCE, WL.id);
        expect(wl).toEqual(WL);
    })


})