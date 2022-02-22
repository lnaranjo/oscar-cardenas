if (!crossOriginIsolated) throw new Error('Cannot use SharedArrayBuffer');

const buffer = new SharedArrayBuffer(4);
const view = new Int32Array(buffer);

// four dedicated workers are instantiated.
for (let i = 0; i < 4; i++) {
  const worker = new Worker('worker.js');
  worker.postMessage({ buffer, name: i });
}

setTimeout(() => {
  // the shared buffer is notified at index 0
  Atomics.notify(view, 0, 3);
}, 500); // the notification is sent at half a second.
