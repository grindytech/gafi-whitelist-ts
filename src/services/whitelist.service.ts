import { Injectable } from '@nestjs/common';
import { validateAddress } from '@polkadot/util-crypto';
import { read_whitelist, write_whitelist } from './filestream/fs.service';
import { IWhitelist } from './types';
import { is_pool } from './utils.service';
import('dotenv/config');

@Injectable()
export class WhitelistService {

  constructor(private readonly source: string) { }

  get(pool_id: string): Promise<IWhitelist> {
    return new Promise<IWhitelist>(async (resolve, reject) => {
      try {
        is_pool(pool_id);

        try {
          let wl = await read_whitelist(this.source, pool_id);

          if (wl.pool_id !== pool_id) {
            reject(`pool_id not found`);
            return;
          }

          resolve(wl);
          return;
        } catch (err) {
          reject(err);
          return;
        }
      } catch (err) {
        reject(err);
      }
    })
  }

  create(whitelist: IWhitelist): Promise<IWhitelist> {
    return new Promise<IWhitelist>(async (resolve, reject) => {
      try {
        is_pool(whitelist.pool_id);

        for (let i = 0; i < whitelist.whitelist.length; i++) {
          if (whitelist.whitelist[i].startsWith("0x")) {
            whitelist.whitelist[i] = whitelist.whitelist[i].substring(2);
          }
        }

        for (const addr of whitelist.whitelist) {
          if (validateAddress("0x" + addr) == false) {
            throw Error(`Address ${addr} invalid`);
          }
        }

        await write_whitelist(this.source, whitelist);
        resolve(whitelist);
      } catch (err) {
        reject(err);
      }
    })
  }

  add(pool_id: string, addresses: string[]): Promise<IWhitelist> {
    return new Promise<IWhitelist>(async (resolve, reject) => {
      try {
        let wl = await this.get(pool_id);
        if (wl) {
          wl.whitelist = wl.whitelist.concat(addresses);

          await this.create(wl);
          resolve(wl);
          return;
        } else {
          reject("Whitelist not found");
        }
      } catch (err) {
        reject(err);
      }
    })
  }

  verify(pool_id: string, address: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let wl = await this.get(pool_id);
        let found_addr = wl.whitelist.find(e => e == address);
        if (found_addr !== undefined && found_addr === address) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        reject(err);
      }
    })
  }

}
