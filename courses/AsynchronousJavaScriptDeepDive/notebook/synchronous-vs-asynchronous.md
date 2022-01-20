# Synchronous vs Asynchronous

### Synchronous

| Disavantage              | Advantage                         |
| ------------------------ | --------------------------------- |
| May create blocking code | Easy to write and to reason about |
| Less performance         |                                   |

### Asynchronous

| Disavantage                          | Advantage                |
| ------------------------------------ | ------------------------ |
| It can be difficult to reason about. | Very performant          |
| Header to write.                     | Eliminates code blocking |

### Asynchronous vs Synchronous

| Topic                              | Synchronous | Asynchronous |
| ---------------------------------- | ----------- | ------------ |
| Easy to read, write and understand | yes         | not          |
| More performant                    | not         | yes          |
| Code blocking                      | yes         | not          |

Considered the next examples to map some diferences between checking the next examples.

Example 1:

```javascript
const syncTest = function () {
  console.log('Start of code');
  alert('Hey, stop the code');
  console.log('End of code');
};

const syncTest2 = function () {
  console.log('Inside of second function');
};

syncTest();
syncTest2();
```

> The order to show in the console is:

```
Log in console: Start of code
Launch the alert
Log in console: End of code
Log in console: Inside of second function
```

> Now, consider the next changes in the code:

```javascript
const asyncTest = function () {
  setTimeout(function () {
    console.log('Start of code');
    alert('Hey, stop the code');
    console.log('End of code');
  }, 1000);
};

const asyncTest2 = function () {
  console.log('Inside of second function');
};

asyncTest();
asyncTest2();
```

> The output is diferent, because the method `setTimeout` delay the execution in 1 second, so the new output is:

```
Log in console: Inside of second function
Log in console: Start of code
Launch the alert
Log in console: End of code
```

To understand why happen this, is necessary understand how works the [Eventloop](./eventloop.md) in JS.
