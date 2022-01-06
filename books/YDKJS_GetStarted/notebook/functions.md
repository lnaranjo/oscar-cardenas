# Functions

## Considerations

- In JS a `function` means a procedure, which is a collection of statements can be called many times, may provides an input and give back one or more outputs.
- Exist many forms to create/declare a function, each form depends the context and usability in time.

## Examples

```javascript
/**
 * Many forms to declare functions in JS
 */

// function declaration
function awesomeFunction() {}

// anonymous function
const awesomeFunction = function () {};

// named function
const namedFunction = function someName() {};
namedFunction.name; // someName

// generator function declaration
function* customGenerator() {}

// async function declaration
async function asyncFunction() {}

// async generator function declaration
async function customAsyncGenerator() {}

// named function export
export function five() {}

// IIFE declaration
(function () {})();
(function namedFunctionIIFE() {})();

// async IIFE
(async function () {});
(async function asyncNamedFunctionIIFE() {});

// arrow function expressions
let f;
f = () => 42;
f = (x) => x * x;
f = (x, y) => x + y;
f = (x) => {
  return x;
};
f = async (x) => {
  const y = await (x * 2);
  return y;
};

operationFunction((x) => x * x);
```
