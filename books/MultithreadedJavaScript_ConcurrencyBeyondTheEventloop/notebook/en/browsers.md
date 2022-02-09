# Browsers

## Dedicated Workers

Web workers allow you to spawn a new environment for executing JavaScript in. JavaScript that is executed in this way is allowed to run in a separate thread from the JavaScript that spawned it. Communication occurs between these two environments by using a pattern called message passing. Recall that it’s JavaScript’s nature to be singlethreaded. Web workers play nicely with this nature and expose message passing by way of triggering functions to be run by the event loop.

## Shared Workers

A shared worker is another type of web worker, but what makes it special is that a shared worker can be accessed by different browser environments, such as different windows (tabs), across iframes, and even from different web workers.

### Advanced Shared Worker Usage

Shared workers are governed by the same object cloning rules. The shared worker instances do have access to a connect event, which can be handled with the self.onconnect() method. Notably missing, especially if you’re familiar with WebSockets, is a disconnect or close event.

Have this event listener pass a special message to the shared worker. Within the shared worker, when the message is received, remove the port from the list of ports. Here’s an example of how to do this:

```javascript
// main JavaScript file
window.addEventListener('beforeunload', () => {
  worker.port.postMessage('close');
});

// shared worker
port.onmessage = (event) => {
  if (event.data === 'close') {
    ports.delete(port);
    return;
  }
};
```

## Services Workers

A service worker functions as a sort of proxy that sits between one or more web pages running in the browser and the server.

Service workers are primarily intended for performing cache management of a website or a single page application. They are most commonly invoked when network requests are sent to the server, wherein an event handler inside the service worker intercepts the network request.

### Advanced Service Worker Concepts

Service workers are intended to only be used for performing asynchronous operations. Because of that, the localStorage API, which technically blocks when reading and writing, isn’t available.

- **Parsed**: This is the very first state of the service worker. At this point the JavaScript content of the file has been parsed. This is more of an internal state that you’ll probably never encounter in your application.

- **Installing**: The installation has begun but is not yet complete. This happens once per worker version. This state is active after oninstall is called and before the event.respondWith() promise has resolved.

- **Installed**: At this point the installation is complete. The onactivate handler is going to be called next. In my testing I find that the service workers jump from installing to activating so fast that I never see the installed state.

- **Activating**: This state happens when onactivate is called but the event.respondWith() promise hasn’t yet resolved.

- **Activated**: The activation is complete, and the worker is ready to do its thing. At this point fetch events will get intercepted.

- **Redundant** At this point, a newer version of the script has been loaded, and the previous script is no longer necessary. This can also be triggered if the worker script download fails, if it contains a syntax error, or if an error is thrown.

## Message Passing Abstractions

Each of the web workers covered in this chapter expose an interface for passing messages into, and receiving messages from, a separate JavaScript environment. This allows you to build applications that are capable of running JavaScript simultaneously across multiple cores.

### The RPC Pattern

This standard is called JSON-RPC, and it’s fairly trivial to implement. This standard defines JSON representations of request and response objects as “notification” objects, a way to define the method being called and arguments in the request, the result in the response, and a mechanism for associating requests and responses. It even supports error values and batching of requests. For this example you’ll only work with a request and response.

JSON-RPC is intended to use JSON as the encoding when serializing messages, particularly when sending messages over the network. In fact, those jsonrpc fields define the version of JSON-RPC that the message is adhering to, which is very important in a network setting.

### The Command Dispatcher Pattern

While the RPC pattern is useful for defining protocols, it doesn’t necessarily provide a mechanism for determining what code path to execute on the receiving end. The command dispatcher pattern solves this, providing a way to take a serialized command, find the appropriate function, and then execute it, optionally passing in arguments.

This pattern is fairly straightforward to implement and doesn’t require a whole lot of magic. First, we can assume that there are two variables that contain relevant information about the method or command that the code needs to run. The first variable is called method and is a string. The second variable is called args and is an array of values to be passed into the method. Assume these have been pulled from the RPC layer of the application.

Another important concept is that only defined commands should be executed. If the caller wants to invoke a method that doesn’t exist, an error should be gracefully generated that can be returned to the caller, without crashing the web worker. And, while the arguments could be passed into the method as an array, it would be a much nicer interface if the array of arguments were spread out into normal function arguments.

Example command dispatcher:

```javascript
// The definition of all supported commands.
const commands = {
  square_sum(max) {
    let sum = 0;
    for (let i = 0; i < max; i++) sum += Math.sqrt(i);
    return sum;
  },
  fibonacci(limit) {
    let prev = 1n,
      next = 0n,
      swap;
    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }
    return String(next);
  },
};

function dispatch(method, args) {
  // check to see if command exists.
  if (commands.hasOwnProperty(method)) {
    // arguments are spread and method is invoked.
    return commands[method](...args);
  }
  throw new TypeError(`Command ${method} not defined!`);
}
```
