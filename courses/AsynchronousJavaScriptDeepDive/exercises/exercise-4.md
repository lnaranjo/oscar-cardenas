# Exercise 4

### Objective

Use the `all` method to transform the [Exercise 2](./exercise-2.md).

### Resolution

> First asign promise to diferents variables:

```javascript
var collection = (function (data) {
  const postsPromise = fetch(`${baseURL}/posts/`).then((response) =>
    response.json()
  );
  const todosPromise = fetch(`${baseURL}/todos/`).then((response) =>
    response.json()
  );
  const commentsPromise = fetch(`${baseURL}/comments/`).then((response) =>
    response.json()
  );
})(collection || {});
```

> Second, put all promises in `all` method as array:

```javascript
var collection = (function (data) {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  const postsPromise = fetch(`${baseURL}/posts/`).then((response) =>
    response.json()
  );

  const todosPromise = fetch(`${baseURL}/todos/`).then((response) =>
    response.json()
  );

  const commentsPromise = fetch(`${baseURL}/comments/`).then((response) =>
    response.json()
  );

  Promise.all([postsPromise, todosPromise, commentsPromise]).then(
    (response) => {
      data.posts = response[0];
      data.todos = response[1];
      data.comments = response[2];
    }
  );

  return data;
})(collection || {});

console.log(collection);
```
