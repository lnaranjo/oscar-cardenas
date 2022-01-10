# Exercise 6

### Objective

Refactor the promise code to create an async function that will take a todo object as a parameter and add the todo to the jsonplaceholder api.

> The function to refactor:

```javascript
const baseURL = 'https://jsonplaceholder.typicode.com';

fetch(`${baseURL}/posts/5`, {
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

### Resolution

> First to this is create a wrapper to promise, adding async/await keywords and ty/catch to handle errors

```javascript
const addTodo = async function (todo) {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  try {
    const request = await fetch(`${baseURL}/posts/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    const response = await request.json();

    console.log({ response });
  } catch (error) {
    console.error(error);
  }
};

addTodo({
  id: 1,
  userId: 1,
  completed: false,
  title: 'Learn promises',
});
```
