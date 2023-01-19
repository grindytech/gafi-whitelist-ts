
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { IWhitelist } from './types';
import { genRanHex, generate_adresses } from './utils.service';
import { WhitelistService } from './whitelist.service';

const SOURCE = "src/services/test";
var WL: IWhitelist;

describe('Whitelist', () => {
    beforeEach(async () => {
        await cryptoWaitReady();
    });

    it('should create whitelist', async () => {

        let id = genRanHex(64);


        let input: IWhitelist = {
            id: id,
            whitelist: generate_adresses(2),
        }

        let whitelist = new WhitelistService(SOURCE);
        let wl = await whitelist.create(input);
        await new Promise((r) => setTimeout(r, 1000));

        let list = await whitelist.get(input.id);
        expect(list).toEqual(input);
        WL = input;
    })

    it('should get pool whitelist', async () => {
        let whitelist = new WhitelistService(SOURCE);
        let wl = await whitelist.get(WL.id);

        expect(wl).toEqual(WL);
    })

    it('add whitelist work', async () => {
        let new_address = generate_adresses(2);
        let whitelist = new WhitelistService(SOURCE);
        let add_wl: IWhitelist = {
            id: WL.id,
            whitelist: new_address,
        }
        await whitelist.add(add_wl);

        await new Promise((r) => setTimeout(r, 1000));

        let new_wl = WL;
        new_wl.whitelist = new_wl.whitelist.concat(new_address);
        let wl = await whitelist.get(WL.id);
        expect(wl).toEqual(new_wl);
    })

    it('verify work', async () => {
        let whitelist = new WhitelistService(SOURCE);
        {
            let verify = await whitelist.verify(WL.id, WL.whitelist[0]);
            expect(verify).toEqual(true);
        }
        {
            let new_address = generate_adresses(1);
            let verify = await whitelist.verify(WL.id, new_address[0]);
            expect(verify).toEqual(false);
        }
    })
})