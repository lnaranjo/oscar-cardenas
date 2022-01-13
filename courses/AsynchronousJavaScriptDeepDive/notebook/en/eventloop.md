# Eventloop

The event loop is an algorithm that constantly checks the call stack to see if there are any function calls that need to be run. When the call stack is empty, the first entry in the callback queue is pushed onto the call stack to complete execution. This happens until the queue is empty.

### The Javascript Engine

The Javascript engine is a software component in charge of executing the code written in JS, we can interpret it as a set of components with specific functions that allow to perform the operations and sentences of the code written in Javascript.

We can divide each of the components as follows:

- **`Eventloop`**
  - **`Heap`** (memory): It is the physical memory space used to store variables, functions and objects.
  - **`Stack`** (functions): This is where functions and API calls are stored (Web API in browsers and C/C++ API on local machines via NodeJs).
- **`Web APIs`**: These are the built-in and default functions and/or properties of the browser or the Nodejs engine.
- **`Callback Queue`**: We can say that it is the execution stack where callbacks are stored for future execution.

### The Javascript problem

In Javascript there is a problem, this problem is related to performance due to the fact that there is only one thread of execution, in other words, there is no possibility of running processes in parallel.

This peculiar problem causes that the processes that require a lot of computational power or processes that take a long time to finish will block the execution thread. The following solutions allow us to understand how it is possible to optimize operations to increase performance and solve problems that would otherwise be conceptually impossible to complete with Javascript.

### Callbacks y Promesas

Originally, `callbacks` were proposed as the first solution to the problem of single-threaded execution. This solution is based on the concept that functions that receive other functions as parameters can be reutlized, this feature allows the creation of asynchronous execution stacks and above all avoids blocking the execution thread, since the functions will be resolved in the background and at different times, which in essence means an improvement in the performance of the programs.

The reality of this solution is that it is one of the most extended and used in Javascript, however, in large applications problems related to scalability, maintenance and it becomes less and less predictable for development teams how to work on future improvements or bug fixes. In the [Callbacks chapter](./callbacks.md), the concept is developed in depth and some examples of application in real situations are included.

Derived from this last problem, in the update of `ECMAScript 6 (ES6)`, an alternative was introduced to objective correct and prevent the problems related to callbacks by providing a standardized and predictable framework with respect to computational or time-consuming processes.

The original idea of using `Promises` is to have the ability to improve traceability, predictability and understanding of synchronous processes through the use of a standardized framework that is also an integrated functionality in the Javascript set. In the [Promises chapter](./promises.md) we can expand on the concept with practical day-to-day examples.
