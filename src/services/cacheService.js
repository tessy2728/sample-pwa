import localforage from 'localforage';

class cacheService {
    constructor() {
        localforage.setDriver(localforage.INDEXEDDB);
    };
    
    writeData = async (key, value) => await localforage.setItem(key, value);

    readData = async (key) => await localforage.getItem(key)
}

export default new cacheService();