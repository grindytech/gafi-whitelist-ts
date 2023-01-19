import { Test } from '@nestjs/testing';
import { WhitelistController } from './whitelist.controller';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { generate_adresses, genRanHex, IWhitelist } from '../services';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('WhitelistController', () => {

  let id: string;
  let addresses: string[];
  let new_addresses: string[];
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WhitelistController],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await cryptoWaitReady();
  });

  describe('Whitelist', () => {

    it('init test values', () => {
      id = genRanHex(64);
      addresses = generate_adresses(2);
      new_addresses = generate_adresses(2);
    })

    it('should create new whitelist', async () => {
      let wl: IWhitelist = {
        id: id,
        whitelist: addresses,
      }

      await request(app.getHttpServer())
        .post('/create')
        .send(wl)
        .expect(200)
        .expect(wl);

      await request(app.getHttpServer())
        .get(`?id=${wl.id}`)
        .expect(200)
        .expect(wl);
    });

    it('should return whitelist', async () => {
      let wl: IWhitelist = {
        id: id,
        whitelist: addresses,
      }

      await request(app.getHttpServer())
        .get(`?id=${wl.id}`)
        .expect(200)
        .expect(wl);
    });

    it('should add new addresses', async () => {
      let wl: IWhitelist = {
        id: id,
        whitelist: new_addresses,
      };

      let new_wl: IWhitelist = {
        id: id,
        whitelist: addresses.concat(new_addresses),
      };

      await request(app.getHttpServer())
        .post('/add')
        .send(wl)
        .expect(200)
        .expect(new_wl);

      await new Promise((r) => setTimeout(r, 1000));

      await request(app.getHttpServer())
        .get(`?id=${wl.id}`)
        .expect(200)
        .expect(new_wl);
    });

    it('verify work', async () => {
      let url = `/verify?id=${id}&address=${addresses[0]}`;
      await request(app.getHttpServer())
        .get(url)
        .expect(200)
        .expect({ result: true });

      await request(app.getHttpServer())
        .get(`/verify?id=${id}&address=${generate_adresses(1)[0]}`)
        .expect(200)
        .expect({ result: false });
    })
  });
});
