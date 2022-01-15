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

If we considering the next examples to map some differences between checking the next examples.

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

The console output would be:

```
$ Start of code
Launch the alert
$ End of code
$ Inside of second function
```

Now, consider the next changes in the code:

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

The output is diferent, because the method `setTimeout` delay the execution in 1 second, so the new output is:

```
$ Inside of second function
$ Start of code
Launch the alert
$ End of code
```
