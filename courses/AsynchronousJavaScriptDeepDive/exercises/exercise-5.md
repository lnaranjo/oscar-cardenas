# Exercise 4

### Objective

Create a function that use the JSONPlaceholder API to retriave the posts, the function have receive and user id to filter all the related post with this id. The data should be store in an array.

### Resolution

> Define the function, the properties it will receive and make the request to de API

```javascript
const getPostById = async function (userId) {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const posts = await fetch(url).then((response) => response.json());
  console.log(posts);
};

getPostById();
```

> Processes the response by filtering the posts related to that id

```javascript
const getPostById = async function (userID) {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const posts = await fetch(url).then((response) => response.json());

  // filter all related post by userId
  const postsByUserId = posts.filter(({ userId }) => userId === userID);

  return postsByUserId;
};

getPostById(10);
```
