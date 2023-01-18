import { IWhitelist } from "../types";
import { readFileSync } from 'fs';
import { writeFile } from "fs/promises";

export function is_pool(pool_id: string): boolean {
  if (pool_id === undefined || pool_id === null || pool_id.length != 64) {
    throw Error(`pool_id must be a string with 64 characters`);
  }
  return true;
}

export function write_whitelist(source: string, whitelist: IWhitelist): Promise<IWhitelist> {
  return new Promise<IWhitelist>((resolve, reject) => {
    try {
      let path = `${source}/${whitelist.pool_id}.json`;
      writeFile(path, JSON.stringify(whitelist));
      resolve(whitelist);
    } catch (err) {
      reject(err);
    }
  })
}

export function read_whitelist(source: string, id: string): Promise<IWhitelist> {
  return new Promise<IWhitelist>(async (resolve, reject) => {
    try {
      let path = `${source}/${id}.json`;
      let data = await readFileSync(path, 'utf8');
      let wl: IWhitelist = JSON.parse(data);
      resolve(wl);
    } catch (err) {
      reject(err);
    }
  })
}