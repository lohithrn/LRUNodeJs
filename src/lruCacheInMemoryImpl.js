// lruCache.js

const LRUCacheInterface = require('./lruCacheInterface');

/**
 * In-memory implementation of LRUCache
 */
class LRUCache extends LRUCacheInterface {
 
  constructor({ size }) {
    super({ size });
    this.cache = new Map(); // Map to store key-value pairs, maintains insertion order
  }

  
  put(key, value) {
    if (this.cache.has(key)) {
      // remove the key to update its position later
      this.cache.delete(key);
    }
    this.cache.set(key, value); // Insert key-value pair
    if (this.cache.size > this.maxSize) {
      // remove the least recently used item (first item in the Map)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

 
  get(key) {
    if (!this.cache.has(key)) {
      return undefined; 
    }
    const value = this.cache.get(key);
   
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  del(key) {
   
    this.cache.delete(key);
  }

  reset() {
   
    this.cache.clear();
  }
}

module.exports = LRUCache;
