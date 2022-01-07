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

> To use promises to get data from remote service, can be use the `fetch` method in the browsers or the package `node-fetch` in nodejs, for example:

```javascript
fetch('https://someurl', {
  /* some props if is necessary, by default method is GET */
})
  // tranform the first request into json object
  .then((response) => response.json())
  // return a second fetch from another url
  .then((data) => fetch('https://another_api'))
  // transform to json the second request
  .then((responseAnoter) => responseAnother.json())
  // prints the data of the last fetch
  .then((finalData) => console.log(finalData));
  // if exist an error, catch will be activated
  .catch(error => console.error(error))
```

> Consider the following 2 APIs to make request; StarWarsAPI, JSONPlaceholder, so the examples can be write in the next examples:

```javascript
const swapi = function (id) {
  let url = 'https://swapi.com/api/people/';

  fetch(`${url}${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(`response from people ${id}`);
      return fetch(data.homeworld);
    })
    .then((hwResponse) => hwResponse.json())
    .then(console.log)
    .catch(console.error);
};

swapi(1);
console.log('End of code');
```

> The output for the previous code, will be:

```text
$ End of code
$ response from people 1
$ "json data" from homeworld for people 1
```

> Now, lets check the JSONPlaceholder API:

```javascript
const baseURL = 'https://jsonplaceholder.typicode.com';
const jsonplaceholderAPI = function (path) {
  return fetch(`${baseURL}${path}`).then((response) => response.json());
};

const todos = jsonplaceholderAPI('/todos');
todos.then(console.log); // print the list of todos

/**
 * Save custom data with POST method
 */

fetch(`${baseURL}/todos/5`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Learn promises',
    userId: 1,
    completed: false,
  }),
})
  .then((response) => response.json())
  .then(console.log)
  .catch(console.error);
```

### Create custom promises

In JS is posible create custom promises using the constructor `Promise` defined as a new instance.

> Lets create a single custom promise

```javascript
const myCustomPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('After 3s send this string');
  }, 3000);
});
```

> Now can use the `myCustomPromise` function:

```javascript
const promise = myCustomPromise();
console.log(promise); // { Promise: {...} }
```

> To execute promise and recieve the string is necessary use `then` to recive data:

```javascript
const promise = myCustomPromise();

promise.them((text) => console.log(text)); // After 3s send this string
```

### The `catch` method

> Another important method to use is `catch` to handle error in a promise. Consider the next example using a wrapper to setTimeout:

```javascript
const promiseTimeout = function (timeInMS) {
  return new Promise(function (resolve, reject) {
    if (isNaN(timeInMS)) {
      reject('timeInMS must be a number');
    }
    setTimeout(resolve, timeInMS);
  });
};

// For this case, catch will be executed and show the error in console
promiseTimeout('notNumber')
  .then(() => console.log('DONE'))
  .catch(console.error);
```

### The `finally` method

Another method in the standard promise chain is `finally`, it provides a way to always execute a callback in cases when exists or not an error as a last part of the promise, the definition is like this:

```javascript
myPromise()
  .then((reponse) => console.log('Some response'))
  .catch((error) => console.error('Some error'))
  // finally runs always, even when `then` or `catch` were not executed
  .finally(() => console.log('Runs in last part of promises'));
```

### The `all` method

The `all` method works passing an array of promises, it returns a promise will only be fulfilled once of the promises inside in the array, but if one promise is failed inmediatly reject all promises.

> Consider this example to show how works it

```javascript
const firstName = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Oscar');
    }, 3000);
  });
};

const lastName = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Cardenas');
    }, 4000);
  });
};

const middleName = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Jesus');
    }, 7000);
  });
};

Promise.all([firstName(), middleName(), lastName()]).then((messages) => {
  console.log(messages); // ['Oscar', 'Jesus', 'Cardenas']
});
```
