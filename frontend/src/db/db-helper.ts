import { openDB, IDBPDatabase, DBSchema } from 'idb';

export enum TABLE_NAME {
  keyval_pair = 'keyval_pair'
};

export enum DB_NAME {
  PDDB = 'PDDB'
}

export enum KEYS {
  mypd = 'mypd',
  filterStartND = 'filterStartND',
  filterEndND = 'filterEndND',
  filterCNY = 'filterCNY',
  filterCAT = 'filterCAT'
}

interface PDDB extends DBSchema {
  keyval_pair: {
    key: string;
    value: any;
  };
}

let db: IDBPDatabase<PDDB>;

export const DB = {
  get: async (key: string) => {
    return db && db.get(TABLE_NAME.keyval_pair, key);
  },
  set: async (key: string, val: any) => {
    return db.put(TABLE_NAME.keyval_pair, val, key);
  },
  del: async (key: string) => {
    return db && db.delete(TABLE_NAME.keyval_pair, key);
  },
  clear: async () => {
    return db && db.clear(TABLE_NAME.keyval_pair);
  },
  keys: async () => {
    return db && db.getAllKeys(TABLE_NAME.keyval_pair);
  }
}

export async function connectDB(version: number) {
  db = await openDB<PDDB>(DB_NAME.PDDB, version, {
    upgrade(db) {
      db.createObjectStore(TABLE_NAME.keyval_pair);
    },
  });
  return db;
};
