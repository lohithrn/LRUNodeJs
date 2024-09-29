
const LRUCacheInMemoryImpl = require('../src/lruCacheInMemoryImpl');

function runTests() {
  console.log('Starting tests...\n');

  // Positive Tests
  try {
    console.log('Test 1: Initialize cache with positive size');
    const cache = new LRUCacheInMemoryImpl({ size: 3 });
    console.log('Passed\n');

    console.log('Test 2: Put and get items');
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    let val = cache.get('a');
    if (val !== 1) throw new Error('Expected 1');
    console.log('Passed\n');

    console.log('Test 3: LRU eviction');
    cache.put('d', 4); // Should evict 'b' as 'a' was recently accessed
    if (cache.get('b') !== undefined) throw new Error('Expected undefined');
    if (cache.get('d') !== 4) throw new Error('Expected 4');
    console.log('Passed\n');

    console.log('Test 4: Delete a key');
    cache.del('c');
    if (cache.get('c') !== undefined) throw new Error('Expected undefined');
    console.log('Passed\n');

    console.log('Test 5: Reset cache');
    cache.reset();
    if (cache.get('a') !== undefined) throw new Error('Expected undefined');
    console.log('Passed\n');

  } catch (error) {
    console.error(`Test failed: ${error.message}\n`);
  }

  // Negative Tests
  try {
    console.log('Negative Test 1: Initialize cache with zero size');
    new LRUCacheInMemoryImpl({ size: 0 });
    throw new Error('Failed: Should have thrown an error for zero size');
  } catch (error) {
    if (error.message === 'Failed: Should have thrown an error for zero size') {
      console.error(error.message + '\n');
    } else {
      console.log('Passed\n');
    }
  }

  try {
    console.log('Negative Test 2: Initialize cache with negative size');
    new LRUCacheInMemoryImpl({ size: -1 });
    throw new Error('Failed: Should have thrown an error for negative size');
  } catch (error) {
    if (error.message === 'Failed: Should have thrown an error for negative size') {
      console.error(error.message + '\n');
    } else {
      console.log('Passed\n');
    }
  }

  try {
    console.log('Negative Test 3: Get a non-existent key');
    const cache = new LRUCacheInMemoryImpl({ size: 2 });
    let val = cache.get('nonexistent');
    if (val !== undefined) {
      console.error('Failed: Expected undefined for non-existent key\n');
    } else {
      console.log('Passed\n');
    }
  } catch (error) {
    console.error(`Test failed: ${error.message}\n`);
  }

  try {
    console.log('Negative Test 4: Delete a non-existent key');
    const cache = new LRUCacheInMemoryImpl({ size: 2 });
    cache.del('nonexistent'); // Should be a no-op
    console.log('Passed\n');
  } catch (error) {
    console.error(`Test failed: ${error.message}\n`);
  }
}

runTests();
