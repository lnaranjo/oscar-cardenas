const isPrime = (function isPrime(v) {
  let primes = {};
  return function isPrime(v) {
    if (v in primes) {
      return primes[v];
    }
    if (v <= 3) {
      return (primes[v] = v > 1);
    }
    if (v % 2 == 0 || v % 3 == 0) {
      return (primes[v] = false);
    }
    let vSqrt = Math.sqrt(v);
    for (let i = 5; i <= vSqrt; i += 6) {
      if (v % i == 0 || v % (i + 2) == 0) {
        return (primes[v] = false);
      }
    }
    return (primes[v] = true);
  };
})();

const factorize = (function factorize(v) {
  let factors = {};
  return function findFactors(v) {
    if (v in factors) {
      return factors[v];
    }
    if (!isPrime(v)) {
      let i = Math.floor(Math.sqrt(v));
      while (v % i != 0) {
        i--;
      }
      return (factors[v] = [...findFactors(i), ...findFactors(v / i)]);
    }
    return (factors[v] = [v]);
  };
})();
