# Promises

Promises provide an asynchronous pattern to solve some problems related to `Callbacks` and is a great feature introduced as part of the ECMAScript 6 update.

But, what defines a Promise in Javascript?:

- It is an object with properties and methods that allow working asynchronously.
- Represents the completion or eventual failure of asynchronous preprocessing.
- Provides a resultant value.

The simple definition of a promise consists of the `Promise` statement that receives a callback, which includes two methods that are sent via the callback arguments.

The first argument sent by the callback represents the function to be executed when the process is successful, while the second parameter represents the function to be executed when the process fails.

Let's look at the following example definition:

```javascript
const myPromise = new Promise(function (resolve, reject) {
  if (someError) {
    reject('Some error');
  }

  resolve('the process is ok');
});
```

Now we can see a practical example of how to implement a promise that is executed 4 seconds after being executed:

```javascript
const asyncFunction = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('asyncFunction has resolved.');
    }, 4000);
  });
};
```

### Then / Catch / Finally

Using the `then`, `catch` and `finally` methods we can specify the flow that the promise will take at the moment it is successfully executed or even if the promise has failed.

In the previously declared promise as an example, we can observe that the function called `resolve` that is executed inside the `setTimeout` is actually determined by the anonymous function that is sent as a parameter of the `then` method, for example:

```javascript
asyncFunction().then((text) => console.log(`Yeah! ${text}`));
```

We can even add a chained `catch` statement to perform the error handling, for this, we see that the representation of the reject function is determined by the anonymous function sent as parameter of the `catch` method, for example:

```javascript
asyncFunction()
  .then((text) => console.log(`Yeah! ${text}`)) // resolve
  .catch((error) => console.log(`Something went wrong: ${error}`)); // reject
```

The `finally` method is always executed once the promessa is finished, regardless of the status, i.e., whether it was successful or failed, for example:

```javascript
asyncFunction()
  .then((text) => console.log(`Yeah! ${text}`)) // resolve
  .catch((error) => console.log(`Something went wrong: ${error}`)) // reject
  .finally(() => {
    // cleaning something
    // reset something
  });
```

Sometimes, it is necessary to execute promises in a nested way, for example, the input of a promise is the response of a previous promise and the expected result is the response of the last promise.

Let's look at the following example, where we define a function that returns a promise:

```javascript
function customPromise(url, id) {
  return new Promise(function (resolve, reject) {
    if (isNaN(id)) {
      return reject('id must be a number');
    }

    resolve(url, id || 0);
  });
}
```

Using the promise defined above, let's see an example where promises can be nested:

```javascript
const p1 = custonPromise('https://unosquare.com', 1);

p1.then(function (url, id) {
  const p2 = customPromise(url, id || 1000);
  return p2;
}).then(console.log); // 'https://unosquare.com', 1000
```

### Promises as a Variables

When it is necessary to reuse a promise under different criteria it is possible to create promises that receive parameters and store the promises in variables to be able to execute them at a later time.

Let's see an example declaring a promise that receives parameters:

```javascript
function setTimeoutCustom(time) {
  return new Promise(function (resolve, reject) {
    if (isNaN(time)) {
      return reject('time must be a number');
    }

    setTimeout(resolve, time);
  });
}
```

Now we can implement different promises with different timing and doing different processes:

```javascript
const timer1 = setTimeoutCustom(1000);
timer1.then(() => console.log('after 1 seconds'));

const timer2 = setTimeoutCustom(10000);
timer2.then(() => console.info('after 10 seconds'));
```

### Custom promises

Promises allow us to create custom instances without using a function, it is only necessary to store it in a variable to create a new instance.

Let's review the following example:

```javascript
const myCustomPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('After 3s send this string');
  }, 3000);
});
```

We can now use the custom promise as follows:

```javascript
const promise = myCustomPromise();
console.log(promise); // { Promise: {...} }
```

### Using the `all` method for multiple requests

When it is necessary to execute multiple promises in the same period of time we use the method all, since it allows us to invoke all the processes without caring the time that each one of them takes, in such a way that when all the processes have been completed correctly it sends us the result of all the promises by means of an argument of the callback in the method then.

In the following example we can observe how this method works with the promises, first we define some promises and save them as variables.

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
```

Then we are going to start an array, where each index corresponds to a promise:

```javascript
const promises = [firstName, middleName, lastName];
```

Now it is time to execute all the promises defined in the array by means of the `Promise.all` method; when all the promises have been completed the anonymous function will be executed and in which the `messages` argument is received with the content of each one of the strings.

```javascript
Promise.all(promises).then((messages) => {
  console.log(messages); // ['Oscar', 'Jesus', 'Cardenas']
});
```

So the `console.log` will be executed after 7 seconds, which was the longest time defined in the `middleName` promise.

### Using promises in API requests

Promises can be used to make requests to remote resources such as APIs, encapsulating the request in a function that receives parameters that allow the functionality to be reutlized.

Let's look at the following implementation example:

```javascript
function fetcher(path, props = {}) {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  return fetch(`${baseURL}/${path}`, props).then((response) => response.json());
}
```

Now it is possible to use the same promise to get different answers by changing the parameters, let's see the following example where we get all of them and print them in the console:

```javascript
// todos
fetcher('todos').then(({ results }) => console.log(results)); // [{...todo1...}, {...todo2...}, {...todoN...}]
```

Now let's use the same promotion to print the posts:

```javascript
// todos
fetcher('posts').then(({ results }) => console.log(results)); // [{...post1...}, {...post2...}, {...postN...}]
```

And finally we can use it to update a post using different properties to make the request:

```javascript
// todos
fetcher('post/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Learn promises',
    userId: 1,
    completed: false,
  }),
}).then(console.log); // {...post_1...}
```
