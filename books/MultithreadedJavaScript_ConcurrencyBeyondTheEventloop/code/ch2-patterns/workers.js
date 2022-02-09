// adds artificial slowdown to methods.
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// a basic wrapper to convert onmessage to an async function.
function asyncOnMessageWrap(fn) {
  return async function (msg) {
    postMessage(await fn(msg.data));
  };
}

const commands = {
  async square_sum(max) {
    // artificial random slowdowns are added to the commands.
    await sleep(Math.random() * 100);
    let sum = 0;
    for (let i = 0; i < max; i++) sum += Math.sqrt(i);
    return sum;
  },
  async fibonacci(limit) {
    await sleep(Math.random() * 100);
    let prev = 1n,
      next = 0n,
      swap;
    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }
    // The BigInt result is coerced into a JSON-friendly string value.
    return String(next);
  },
  async bad() {
    await sleep(Math.random() * 10);
    throw new Error('oh no');
  },
};

// the onmessage wrapper is injected.
self.onmessage = asyncOnMessageWrap(async (rpc) => {
  const { method, params, id } = rpc;
  if (commands.hasOwnProperty(method)) {
    try {
      const result = await commands[method](...params);

      // a successful json-rpc-like message is resolved on success.
      return { id, result };
    } catch (err) {
      return { id, error: { code: -32000, message: err.message } };
    }
  } else {
    // an erroneous JSON-RPC-like message is rejected if a method doesn’t exist.
    return {
      id,
      error: {
        code: -32601,
        message: `method ${method} not found`,
      },
    };
  }
});
