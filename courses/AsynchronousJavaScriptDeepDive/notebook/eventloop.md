# Eventloop

The event loop is an algorithm that constantly checks the call stack to see if there are any function calls that need to be run. When the call stack is empty, the first entry in the callback queue is pushed onto the call stack to complete execution. This happens until the queue is empty.

### The Javascript Engine

The Javascript Engine can be explain in these concepts:

- Eventloop
  - Heap (memory): This is the physical memory space that is used to store variables, functions, and objects.
  - Stack (functions): This is where function and API calls (Web API in browsers and C/C++ API on local machines via NodeJs) are stored.
- Web APIs: This is where the actual functionality for built-in functions.
- Callback Queue: The space when the callback functions are placed.

Another important concept is single threat in JS, this concept is very inefficient because all the functions are pushed in the callstack, executes and popped off. This peculiarity in JS means that if there are functions that take a long time to execute, the programs will be blocked until the entire execution stack has been completed. How can we solve this problem?

### Async callbacks vs JS Promises

The `async callbacks` are a solution because they allow sending more functions as parameters of others, which generates an interdependence of executions and the best thing is that it does not block the flow of the program. The negative side is that they are difficult to maintain, understand and extend, since in many occasions a correct implementation of them is not followed.

Another way that was introduced in ES6 are the `Promises`, these allow a better solution because it has states that allow better traceability without sacrificing performance and blocking the flow in the program, more predictable, easy to understand and maintain.

For better references to promises and callbacks, you can review the following chapters:

- [Callbacks](./callbacks.md)
- [Promises](./promises.md)
