class LRUCache {
  maxSize: number;
  cache: Map<number, number>;
  constructor(capacity: number) {
    this.maxSize = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    const value = this.cache.get(key);
    if (value === undefined) return -1;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
      return;
    }

    if (this.cache.size < this.maxSize) {
      this.cache.set(key, value);
      return;
    }

    const iterator = this.cache.keys();
    this.cache.delete(iterator.next().value!);
    this.cache.set(key, value);
  }
}

export {};

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4
