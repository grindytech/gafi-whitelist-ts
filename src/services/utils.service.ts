
export function is_pool(pool_id: string): boolean {
  if (pool_id === undefined || pool_id === null || pool_id.length != 64) {
    throw Error(`pool_id must be a string with 64 characters`);
  }
  return true;
}
