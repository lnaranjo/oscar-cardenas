console.log('red.js');

// instantiate the shared worker
const worker = new SharedWorker('shared-worker.js');

// note the worker.port property for communications
worker.port.onmessage = (event) => {
  console.log('EVENT', event.data);
};
