# NodeJS

Parallelism can also be useful in the original Node.js use case, which is servers. Data processing may happen a lot, depending on your application. For example, server side rendering (SSR) involves a lot of string manipulation where the source data is already known.

The code is a standard HTTP server in Node.js. It simply responds to any request, regardless of path or method, with “Hello, World!” followed by a new line character:

```javascript
const http = require('http');

http
  .createServer((req, res) => {
    res.end('Hello, World!\n');
  })
  .listen(3000);
```

Now, let’s add four processes with cluster. With the cluster module, the common approach is to use an if block to detect whether we’re in the main listening process or one of the worker processes. If we’re in the main process, then we have to do the work of spawning the worker processes.

```javascript
const http = require('http');
// require the cluster module
const cluster = require('cluster');

// change code paths depending on whether we’re in the primary process
if (cluster.isPrimary) {
  // in the primary process, create four worker processes
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  http
    .createServer((req, res) => {
      res.end('Hello, World!\n');
    })
    // in the worker processes, create a web server and listen
    .listen(3000);
}
```

## The `worker_threads` Module

Node.js’s support for threads is in a built-in module called worker_threads. It provides an interface to threads that mimics a lot of what you’d find in web browsers for web workers. Since Node.js is not a web browser, not all the APIs are the same, and the environment inside these worker threads isn’t the same as what you’d find inside web workers.

There are a few differences in the API compared to the main thread though:

- You can’t exit the program with process.exit(). Instead this will just exit the thread.
- You can’t change working directories with process.chdir(). In fact, this function is not even available.
- You can’t handle signals with process.on().

There is an example using spawning a new worker thread in Node.js:

```javascript
const { Worker } = require('worker_threads');
const worker = new Worker('/path/to/worker-file-name.js');
```

The filename here is the entrypoint file that we want to run inside the worker thread. This is similar to the entrypoint in the main file that we’d specify as an argument to node on the command line.

### `workerData`

Passing data to a worker thread via workerData:

```javascript
const { Worker, isMainThread, workerData } = require('worker_threads');
const assert = require('assert');

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: {
      num: 42,
    },
  });
} else {
  assert.strictEqual(workerData.num, 42);
}
```

Rather than using a separate file for the worker thread, we can use the current file with \_\_filename and switch the behavior based on isMainThread. It’s important to note that the properties of the workerData object are cloned rather than shared between threads.

### `MessagePort`

A MessagePort is one end of a two-way data stream. By default, one is provided to every worker thread to provide a communication channel to and from the main thread. It’s available in the worker thread as the parentPort property of the worker_threads module.

Bidirectional communication via the default MessagePorts:

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (msg) => {
    worker.postMessage(msg);
  });
} else {
  parentPort.on('message', (msg) => {
    console.log('We got a message from the main thread:', msg);
  });
  parentPort.postMessage('Hello, World!');
}
```

Also it can create a pair of MessagePort instances connected to each other via the MessageChannel constructor.

```javascript
const {
  Worker,
  isMainThread,
  MessageChannel,
  workerData,
} = require('worker_threads');

if (isMainThread) {
  const { port1, port2 } = new MessageChannel();
  const worker = new Worker(__filename, {
    workerData: {
      port: port2,
    },
    transferList: [port2],
  });
  port1.on('message', (msg) => {
    port1.postMessage(msg);
  });
} else {
  const { port } = workerData;
  port.on('message', (msg) => {
    console.log('We got a message from the main thread:', msg);
  });
  port.postMessage('Hello, World!');
}
```

## Worker Pools with Piscina

Many types of workloads will naturally lend themselves to using threads. In Node.js, most workloads involve processing an HTTP request. If within that code you find yourself doing a lot of math or synchronous data processing, it may make sense to offload that work to one or more threads.

This function can also be an async function, so that you can do asynchronous tasks in a worker thread if you need to. A basic example calculating square roots in worker threads:

```javascript
const Piscina = require('piscina');

/**
  Much like cluster and worker_threads, piscina
  provides a handy boolean for determining whether we’re
  in the main thread or a worker thread.
*/
if (!Piscina.isWorkerThread) {
  // we’ll use the same technique for using the same file as we did with the happycoin example.
  const piscina = new Piscina({ filename: __filename });

  piscina.run(9).then((squareRootOfNine) => {
    console.log('The square root of nine is', squareRootOfNine);
  });
}

// The exported function is used in the worker thread to perform the actual work. In this case, it’s just calculating a square root.
module.exports = (num) => Math.sqrt(num);
```

Computing ten million square roots with piscina:

```javascript
const Piscina = require('piscina');
const assert = require('assert');

if (!Piscina.isWorkerThread) {
  const piscina = new Piscina({ filename: __filename });
  for (let i = 0; i < 10_000_000; i++) {
    piscina.run(i).then((squareRootOfI) => {
      assert.ok(typeof squareRootOfI === 'number');
    });
  }
}

module.exports = (num) => Math.sqrt(num);
```

The piscina module lets you set a limit by using a maxQueue option in its constructor, which can be set to any positive integer. Through experimentation, the maintainers of piscina have found that an ideal maxQueue value is the square of the number of worker threads it’s using. Handily, you can use this number without even knowing it by setting maxQueue to auto.

```javascript
const Piscina = require('piscina');
const assert = require('assert');
const { once } = require('events');

if (!Piscina.isWorkerThread) {
  const piscina = new Piscina({
    filename: __filename,
    // limits the queue size to the square of the number of threads that piscina is using
    maxQueue: 'auto',
  });
  (async () => {
    for (let i = 0; i < 10_000_000; i++) {
      // when this check is true, the queue is full
      if (piscina.queueSize === piscina.options.maxQueue) {
        //  submitting any new tasks to the queue
        await once(piscina, 'drain');
      }
      piscina.run(i).then((squareRootOfI) => {
        assert.ok(typeof squareRootOfI === 'number');
      });
    }
  })();
}
module.exports = (num) => Math.sqrt(num);
```
