# Generators

Generators have been around longer than `async/await`. Basically a generator is a way of writing code that can pause and continue at a later time. A generator is a function that we can use to make code pause and not continue until we tell it to at a later time.

A `generator` consists of two main parts. The first part consists of defining a function as a generator function, which requires the use of the asterisk character after the reserved word `function`. The second part requires the use of the `yield` keyword in the places where a pause is needed and then executed with the `next()` method.

Let's see how to declare a `generator` in a simple way, using `*` after the reserved word `function`.

```javascript
const myGenerator = function* () {
  let x = 0;
  console.log('start');
  x++;
  console.log(x);
  x++;
  console.log(x);
  console.log('finish');
  return x;
};

const gen = myGenerator();
const value = gen.next(); // { value: 3, done: true }
```

One of the purposes of using `generators` is the possibility of continuing with the processes in a different time than the execution time, for this we will use the `yield` keyword to be able to stop and continue with those processes by using the `next()` method.

```javascript
const myGenerator = function* () {
  let x = 0;
  console.log('start');
  x++;
  yield;
  console.log(x);
  x++;
  console.log(x);
  yield;
  console.log('finish');
  return x;
};

const gen = myGenerator();
let value = gen.next(); // { value: undefined, done: false }
// start

value = gen.next(); // { value: undefined, done: false }
// 1
// 2

value = gen.next(); // { value: 3, done: true }
// finish
```

Let us see an example in order to facilitate the understanding of what is done with `generators`.

Suppose we need to create a function that performs the calculation of a fibonacci sequence, so the proposal can look like this:

```javascript
const fibonacci = function (len, nums = [0, 1]) {
  let next = 0;
  let count = 2;
  let num1 = nums[0];
  let num2 = nums[1];

  while (count < len) {
    next = num1 + num2;
    num1 = num2;
    num2 = next;
    nums.push(next);
    count++;
  }

  return nums;
};
```

The function created above performs the sequence calculation, however, when the length of the sequence is too long the processing causes a blocking of the execution thread until the last element is finished.

By using `generators` we can create a better proposal that allows us to have control of the sequence growth with the use of the `next()` method and thus prevent the blocking of the execution thread.

```javascript
const fibonacci = function* (len, nums = [0, 1]) {
  let next = 0;
  let count = 2;
  let num1 = nums[0];
  let num2 = nums[1];

  while (count < len) {
    next = num1 + num2;
    num1 = num2;
    num2 = next;
    nums.push(next);
    count++;
    yield nums;
  }

  return nums;
};

const fib = fibonacci(1000);
fib.next(); // { value: [0, 1, 1], done: false }
fib.next(); // { value: [0, 1, 1, 2], done: false }
fib.next(); // { value: [0, 1, 1, 2, 3], done: false }
fib.next(); // { value: [0, 1, 1, 2, 3, 5], done: false }
// ...
fib.next(); // { value: [0, 1, 1, 2, 3, 5...], done: true }
```

### Using a `Generator` to create an `Iterator`

In simple terms an Iterator is an object that allows us to go through a collection and return a value when the process was completed and as this process is implemented by using the `next()` method it is possible to create it through a generator, let's see the following example:

```javascript
const arrayIterator = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
};
```

Now we can send an array that will be executed step by step as the `next()` function is executed, so that we can know through the `done` field if the whole array has been traversed; for example:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
let arrIt = arrayIterator(arr);

arrIt.next(); // { value: 'a', done: false }
arrIt.next(); // { value: 'b', done: false }
arrIt.next(); // { value: 'c', done: false }
arrIt.next(); // { value: 'd', done: false }
arrIt.next(); // { value: 'e', done: true }
```

Finally we have a quite popular implementation on data types where it is not possible to iterate by default, such as `Object`, which by not having a default iterator specified can be defined and used by loops, such as `for`.

Let's see the following example, where we define an object with initial values:

```javascript
let myObject = {
  1: 'one',
  2: 'two',
  3: 'three',
};
```

Now, we can define the `Symbol.iterator` by using a `generator`:

```javascript
myObject[Symbol.iterator] = function* () {
  for (let i = 1; i < 4; i++) {
    yield this[i];
  }
};
```

So it can now be iterated through the `for` loop that originally only worked with arrays:

```javascript
for (let v of myObject) {
  console.log(v);
}
// one
// two
// three
```
