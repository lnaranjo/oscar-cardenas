# Functions

### Considerations

- In Javascript a `function` means a procedure, which is a collection of statements can be called many times, may provides an input and give back one or more outputs.
- Exist many forms to create/declare a function, each form depends the context and usability in time.

### Different ways of declaring a function:

#### Function declaration

```javascript
function awesomeFunction() {}
```

#### Anonymous function

```javascript
const awesomeFunction = function () {};
```

#### Named function

```javascript
const namedFunction = function someName() {};
namedFunction.name;
```

#### Generator function declaration

```javascript
function* customGenerator() {}
```

#### Async function declaration

```javascript
async function asyncFunction() {}
```

#### Async generator function declaration

```javascript
async function customAsyncGenerator() {}
```

#### Named function export

```javascript
export function five() {}
```

#### IIFE declaration

```javascript
(function () {})();
(function namedFunctionIIFE() {})();
```

#### Async IIFE

```javascript
(async function () {});
(async function asyncNamedFunctionIIFE() {});
```

#### Arrow function expressions

```javascript
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
