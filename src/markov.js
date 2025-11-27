// src/markov.js
// Character-level Markov generator, similar in spirit to your Java TextGenerator

export default class MarkovGenerator {
  constructor(chainLength = 8) {
    this.chainLength = chainLength;
    this.map = new Map(); // key: string of length n -> [{ ch, count }, ...]
    this.seed = "";
  }

  train(text) {
    this.map.clear();
    this.seed = "";

    const n = this.chainLength;
    if (!text || text.length <= n) return;

    // Build map: for each key of length n, record the next character
    for (let i = 0; i <= text.length - n - 1; i++) {
      const key = text.slice(i, i + n);
      const nextChar = text[i + n];

      if (!this.map.has(key)) {
        this.map.set(key, [{ ch: nextChar, count: 1 }]);
      } else {
        const arr = this.map.get(key);
        const existing = arr.find((e) => e.ch === nextChar);
        if (existing) {
          existing.count += 1;
        } else {
          arr.push({ ch: nextChar, count: 1 });
        }
      }
    }

    // Choose seed key: the one with the highest total counts
    let bestKey = "";
    let bestTotal = -1;
    for (const [key, arr] of this.map.entries()) {
      const total = arr.reduce((sum, e) => sum + e.count, 0);
      if (total > bestTotal) {
        bestTotal = total;
        bestKey = key;
      }
    }

    this.seed = bestKey || text.slice(0, n);
  }

  generate(length = 2000) {
    if (!this.seed || this.map.size === 0) return "";

    const n = this.chainLength;
    let output = this.seed;
    let state = this.seed;

    for (let i = 0; i < length; i++) {
      const options = this.map.get(state);
      if (!options || options.length === 0) break;

      // Weighted random pick
      const total = options.reduce((sum, e) => sum + e.count, 0);
      let r = Math.floor(Math.random() * total);

      let chosen = null;
      for (const e of options) {
        if (r < e.count) {
          chosen = e.ch;
          break;
        }
        r -= e.count;
      }

      if (!chosen) break;

      output += chosen;
      state = output.slice(output.length - n); // last n chars
    }

    return output;
  }
}
