import { Keyring } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { mnemonicGenerate } from '@polkadot/util-crypto';

export function is_pool(pool_id: string): boolean {
  if (pool_id === undefined || pool_id === null || pool_id.length != 64) {
    throw Error(`pool_id must be a string with 64 characters`);
  }
  return true;
}

export const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export function generate_adresses(num: number): string[] {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
  let addresses: string[] = [];
  for (let i = 0; i < num; i++) {
    let seed = mnemonicGenerate();
    const pair = keyring.addFromUri(seed, { name: 'key pair' }, 'sr25519');
    const addr_hex = u8aToHex(pair.publicKey, undefined, false);
    addresses.push(addr_hex);
  }
  return addresses;
}