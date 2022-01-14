# Exercise 8

### Objective

Change the code of [Exercise 4](./exercise-4.md) using async/await to resolve all promises.

### Resolution

```javascript
var collection = (function (data) {
  (async function () {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    try {
      const postsPromise = fetch(`${baseURL}/posts/`);
      const todosPromise = fetch(`${baseURL}/todos/`);
      const commentsPromise = fetch(`${baseURL}/comments/`);

      const [posts, todos, comments] = await Promise.all([
        postsPromise,
        todosPromise,
        commentsPromise,
      ]);

      data.posts = await posts.json();
      data.todos = await todos.json();
      data.comments = await comments.json();
    } catch (error) {
      console.log(error);
    }
  })();

  return data;
})(collection || {});

console.log(collection);
```
