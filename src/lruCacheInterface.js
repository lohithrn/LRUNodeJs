// lruCacheInterface.js

/**
 * Interface Only for LRUCache
 */
class LRUCacheInterface {
   
    constructor(options) {
      if (new.target === LRUCacheInterface) {
        throw new TypeError("Cannot construct LRUCacheInterface instances directly");
      }
      if (!options || typeof options.size !== 'number' || options.size <= 0) {
        throw new Error('Size must be a positive integer');
      }
      this.maxSize = options.size;
    }
  
    put(key, value) {
      throw new Error("Method 'put' must be implemented.");
    }
  
   
    get(key) {
      throw new Error("Method 'get' must be implemented.");
    }
  
  
    del(key) {
      throw new Error("Method 'del' must be implemented.");
    }
  
    reset() {
      throw new Error("Method 'reset' must be implemented.");
    }
  }
  
  module.exports = LRUCacheInterface;
  