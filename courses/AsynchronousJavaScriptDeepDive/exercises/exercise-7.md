# Exercise 7

### Objective

The following promise code is inside a module patter. Change the promise code so that it uses async/await instead. You will want to use IIFE for this and make sure to catch any errors. Check the [Exercise 2](./exercise-2.md).

### Resolution

> As a first change, add the async/await and try/catch sentences and second change the promise storage the response of service inside this

```javascript
var collection = (function (data) {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  (async function () {
    try {
      const request = await fetch(`${baseURL}/posts/`);
      const response = await request.json();

      data.post = response;
    } catch (error) {
      console.error(error);
    }
  })();
})(collection || {});

console.log(collection);
```
