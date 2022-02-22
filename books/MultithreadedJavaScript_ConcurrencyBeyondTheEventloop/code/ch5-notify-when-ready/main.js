if (!crossOriginIsolated) {
  throw new Error('Cannot use SharedArrayBuffer');
}

let count = 4;
const now = Date.now();
const buffer = new SharedArrayBuffer(4);
const view = new Int32Array(buffer);

// instantiate four workers
for (let i = 0; i < 4; i++) {
  const worker = new Worker('worker.js');
  // immediately post a message to the workers
  worker.postMessage({ buffer, name: i });
  worker.onmessage = () => {
    console.log(`Ready; id=${i}, count=${--count}, time=${Date.now() - now}ms`);
    // notify on the 0th entry once all four workers reply
    if (!count) Atomics.notify(view, 0);
  };
}
