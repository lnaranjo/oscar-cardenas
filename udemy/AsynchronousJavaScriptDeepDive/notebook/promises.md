# Promises

The promises provide an asynchronous pattern to solve many problems related with callbacks and it's a great featured introduced as a part of ES6 update.

But, what defines a Promise in JS?:

- It's an object with properties and methods.
- Represents the eventual completion or failure of an async operation.
- Provides a resulting value
- It's basically a JS object with somethings that allow works asynchronously.

Some examples to create a promise are in the next code:

> In this case the resolve function will be executed after 4 seconds

```javascript
const asyncFunction = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('asyncFunction has resolved.');
    }, 4000);
  });
};
```

> And in this case the resolve function will be executed after 3 seconds

```javascript
const asyncFunction2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('asyncFunction2 is done.');
    }, 3000);
  });
};
```

A promise execution executes some properties as a methods that recieved a callback, like `then`, `catch` and will be executed when the operation is done or failure.

> In this case, use `then` to recieve the string from a promise, like this:

```javascript
asyncFunction().then((text) => console.log(`Yeah! ${text}`));
```

> Also is possible save a promise in a variable and execute in another moment, like this:

```javascript
const promise = asyncFunction();

// execute in another moment
promise.then((text) => console.log('In another moment. ' + text));
```

> In some cases is necessary execute another promise inside a resolve promise, for this cases lets check the following example:

```javascript
const promise = asyncFunction();

const promise2 = promise.then((text1) => {
  console.log(`Awesome. ${text1}`);
  return asyncFunction2();
});

promise2.then((text2) => {
  console.log(`Now, execute text 2. ${text2}`);
});
```
