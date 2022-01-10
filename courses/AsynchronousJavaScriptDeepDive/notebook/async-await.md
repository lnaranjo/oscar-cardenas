# Async & Await

The `async & await` keywords appeared in JS after promises, the main purpose is to simplify our promise code. Basically it enables to write promise based code as if it were synchronous but without blocking the execution threat.

> The next example shows how to create an async function:

```javascript
// use the reserved word `async` to define
const myAsyncFunction = async function () {
  // doStuff...
};
```

> Now, compare a plain function vs async function:

```javascript
// declare plain functio
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

In the previous example, the main difference between a plainFunction is it returns a string ('Done') while async function returns a promise.

> A simple example to consume data from the StarWarsAPI (swapi)

```javascript
const getFilms = async function () {
  const url = 'https://swapi.com/api/films';

  // make the request
  const data = await fetch(url).then((response) => response.json());

  const films = data.results;

  console.log({ films }); // print a list of all results

  return data;
};

getFilms();
console.log('Print this because is an async function');
```

### Error hanlder

To handler errors when using async/await is possible use `try/catch` block code, the next example show a short way to implements that.

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

With async/await is possible make request by example of an array of promises. In the next example many ways to operate with that.

> Using `for - of` to preview some promises

```javascript
const promises = [fetch(url1), fetch(url2), fetch(url3)];

// iterate each promise resolve
for await (let promise of promises) {
  console.log(promise);
}
```

> Using `Promise.all` to make all requests:

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
