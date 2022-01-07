# Exercise 2

### Objective

White a IIFE fucntion to runs on application starts and the return all the `comments`, `todos` and `posts` using the JSONPlaceholderAPI.

### Resolution

> First, declare a IIFE function to recieve an object to collect the data:

```javascript
var collection = (function (data) {})(collection || {});
```

> Second, write all request to `JSONPlaceholderAPI` using `fetch`:

```javascript
var collection = (function (data) {
  // define a baseURL
  const baseURL = 'https://jsonplaceholder.typicode.com';

  // get all posts
  fetch(`${baseURL}/posts/`)
    .then((response) => response.json())
    .then((posts) => {
      data.posts = posts;
    });

  // get all todos
  fetch(`${baseURL}/todos/`)
    .then((response) => response.json())
    .then((todos) => {
      data.todos = todos;
    });

  // get all comments
  fetch(`${baseURL}/comments/`)
    .then((response) => response.json())
    .then((comments) => {
      data.comments = comments;
    });

  return data;
})(collection || {});

console.log(collection.posts); // prints the list of all posts
console.log(collection.todos); // prints the list of all todos
console.log(collection.comments); // prints the list of all comments
```
