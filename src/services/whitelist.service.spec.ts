import { Keyring } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
import { IWhitelist } from './types';
import { WhitelistService } from './whitelist.service';

const SOURCE = "src/services/test";
var WL: IWhitelist;

describe('Whitelist', () => {
    beforeEach(async () => {
        await cryptoWaitReady();
    });

    const generate_adresses = (num: number): string[] => {
        const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
        let addresses: string[] = [];
        for (let i = 0; i < 2; i++) {
            let seed = mnemonicGenerate();
            const pair = keyring.addFromUri(seed, { name: 'key pair' }, 'sr25519');
            const addr_hex = u8aToHex(pair.publicKey, undefined, false);
            addresses.push(addr_hex);
        }
        return addresses;
    }

    it('should create whitelist', async () => {
        const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

        let pool_id = genRanHex(64);


        let input: IWhitelist = {
            pool_id: pool_id,
            whitelist: generate_adresses(2),
        }

        let whitelist = new WhitelistService(SOURCE);
        let wl = await whitelist.create(input);
        await new Promise((r) => setTimeout(r, 1000));

        let list = await whitelist.get(input.pool_id);
        expect(list).toEqual(input);
        WL = input;
    })

    it('should get pool whitelist', async () => {
        let whitelist = new WhitelistService(SOURCE);
        let wl = await whitelist.get(WL.pool_id);

        expect(wl).toEqual(WL);
    })

    it('add whitelist work', async () => {
        let new_address = generate_adresses(2);
        let whitelist = new WhitelistService(SOURCE);
        await whitelist.add(WL.pool_id, new_address);

        await new Promise((r) => setTimeout(r, 1000));

        let new_wl = WL;
        new_wl.whitelist = new_wl.whitelist.concat(new_address);
        let wl = await whitelist.get(WL.pool_id);
        expect(wl).toEqual(new_wl);
    })

    it('verify work', async () => {
        let whitelist = new WhitelistService(SOURCE);
        {
            let verify = await whitelist.verify(WL.pool_id, WL.whitelist[0]);
            expect(verify).toEqual(true);
        }
        {
            let new_address = generate_adresses(1);
            let verify = await whitelist.verify(WL.pool_id, new_address[0]);
            expect(verify).toEqual(false);
        }
    })
})