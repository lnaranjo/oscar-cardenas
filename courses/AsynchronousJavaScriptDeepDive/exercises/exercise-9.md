# Exercise 9

### Objective

Using the random number code below, set up a generator function that will act as a producer of a random value. It should return a random number whenever next invoked. Set the function up so it can be used to create a random number between 1 and 100 or 1 and 10 or 1 and any number; basically the end number should be whatever is passed into the function.

### Resolution

```javascript
const randomNum = function* (end) {
  while (true) {
    yield Math.floor(Math.random() * end) + 1;
  }
};

const randNumber = randomNum(1000);

randNumber.next(); // { value: 214, done: false }
randNumber.next(); // { value: 956, done: false }
randNumber.next(); // { value: 578, done: false }
```
