// random id for debugging
const ID = Math.floor(Math.random() * 999999);
console.log('shared-worker.js', ID);

// singleton list of ports
const ports = new Set();

// connection event handler
self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);
  console.log('CONN', ID, ports.size);

  // callback when a new message is received
  port.onmessage = (event) => {
    console.log('MESSAGE', ID, event.data);

    // messages are dispatched to each window
    for (let p of ports) {
      p.postMessage([ID, event.data]);
    }
  };
};
