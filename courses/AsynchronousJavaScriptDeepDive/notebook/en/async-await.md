# Async & Await

The `async & await` keywords appeared in JS after promises, the main purpose is to simplify our promise code. Basically it enables to write promise based code as if it were synchronous but without blocking the execution threat.

The next example shows how to create an async function:

```javascript
// use the reserved word `async` to define
const myAsyncFunction = async function () {
  // doStuff...
};
```

Now let's look at the difference between an asynchronous function and a synchronous function.

```javascript
// declare plain function
const plainFunction = function () {
  console.log('plainFunction');
  return 'done';
};

// declare an async function
const asyncFunction = async function () {
  console.log('asyncFunction');
  return 'done';
};

// execute two functions
const plainResult = plainFunction(); // show in console: plainFunction
const asyncResult = asyncFunction(); // show in console: asyncFunction

// print in console
console.log(plainResult); // done
console.log(asyncResult); // { Promise: {...} }
```

The asynchronous functions allow us to make requests to the remote APIs, in the following example we perform preticion of the films of the Star Wars series:

```javascript
const getFilms = async function () {
  const url = 'https://swapi.com/api/films';
  const data = await fetch(url).then((response) => response.json()); // se realiza la peticion
  const films = data.results;

  console.log({ films }); // print a list of all results

  return data;
};

getFilms();
console.log('Print this because is an async function');
```

### Error handling

For error handling using `async/await` we can use the `try/catch` block statement to contain the error and define a controlled output stream.

```javascript
async function someFunctionWithError() {
  try {
    const request = await fetch(url);
    const response = await request.json();
  } catch (error) {
    console.error(`Catch if exists an error, ${error}`);
  }
}
```

### Promises / array of promises

Sometimes it is necessary to make multiple requests to a service or to perform asynchronous activities in the same execution time; to do this, it is possible to generate arrays of promises and to be able to execute them at the same time.

Let's use the `for-of` statement to execute each of the requests in the promise array:

```javascript
const promises = [fetch(url1), fetch(url2), fetch(url3)];

// iterate each promise resolve
for await (let promise of promises) {
  console.log(promise);
}
```

It is also possible to execute the requests using the `Promise.all` statement to execute the requests and handle the responses in a different processing, let's see the following example:

```javascript
(async function () {
  const [request1, request2, request3] = await Promise.all([
    fetch(url1),
    fetch(url2),
    fetch(url3),
  ]);

  const response1 = await request1.json();
  const response2 = await request2.json();
  const response3 = await request3.json();

  console.log({
    response1,
    response2,
    response3,
  });
});
```
