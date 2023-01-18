import { Test, TestingModule } from '@nestjs/testing';
import { WhitelistController } from './whitelist.controller';
import { WhitelistService } from '../services/whitelist.service';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { generate_adresses, genRanHex, IWhitelist } from '../services';

describe('WhitelistController', () => {

  let appController: WhitelistController;
  let pool_id: string;
  let addresses: string[];
  let new_addresses: string[];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WhitelistController],
      providers: [],
    }).compile();

    appController = app.get<WhitelistController>(WhitelistController);
    await cryptoWaitReady();
  });

  describe('Whitelist', () => {

    it('init test values', () => {
      pool_id = genRanHex(64);
      addresses = generate_adresses(2);
      new_addresses = generate_adresses(2);
    })

    it('should create new whitelist', async () => {
      let wl: IWhitelist = {
        pool_id,
        whitelist: addresses,
      }
      expect(await appController.create(wl)).toBe(wl);
    });

    it('should return whitelist', async () => {
      let wl: IWhitelist = {
        pool_id: pool_id,
        whitelist: addresses,
      }
      await new Promise((r) => setTimeout(r, 1000));
      expect(await appController.get(wl.pool_id)).toStrictEqual(wl);
    });

    it('should add new addresses', async () => {
      let wl: IWhitelist = {
        pool_id,
        whitelist: new_addresses,
      };

      await appController.add(wl);
      await new Promise((r) => setTimeout(r, 1000));

      let new_wl: IWhitelist = {
        pool_id,
        whitelist: addresses.concat(new_addresses),
      };
      expect(await appController.get(wl.pool_id)).toStrictEqual(new_wl);
    });

    it('verify work', async () => {
        expect(await appController.verify({ pood_id: pool_id, address: addresses[0] })).toEqual(true);
        expect(await appController.verify({ pood_id: pool_id, address: generate_adresses(1)[0] })).toEqual(false);
    })
  });
});
