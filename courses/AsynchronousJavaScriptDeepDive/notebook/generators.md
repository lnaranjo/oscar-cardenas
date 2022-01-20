# Generators

Generators have been around longer than async await. Basically a generator is a way to write code that you can pause and then continue at a later time. Well a generator is a function that we can use to cause the code to yield and the code won't continue until tell it to some later time.

A generator involves two main parts.The first part define a function as a generator function and this requires the use of the asterisk character.The second part requires the use of the yield keyword you place yield statements inside the generator function at the points where you want the function to pause.

> This is an example that shows looks a `generator`:

```javascript
// function and * to define
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

> Now, added it the `yield` inside function as a pause in that point:

```javascript
// function and * to define
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

> Inside the function is possible attach some process to `yield`, check the next example:

```javascript
// function and * to define
const myGenerator = function* () {
  let x = 0;
  console.log('start');
  yield ++x;
  console.log(x);
  x++;
  console.log(x);
  yield x++;
  console.log('finish');
  return x;
};

const gen = myGenerator();
let value = gen.next(); // { value: 1, done: false }
// start

value = gen.next(); // { value: 2, done: false }
// 1
// 2

value = gen.next(); // { value: 4, done: true }
// finish
```

Consider the next example to calculate a Fibonacci sequence:

> In this example using synchronous patter and the code continues when finish:

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

> Now, transform this example using `generator`, it looks like this:

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

### Using a Generator to create an Interator

Consider the next example to create an Iteator using a function as generator:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];

const arrayIterator = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
};

let arrIt = arrayIterator();

arrIt.next(); // { value: 'a', done: false }
arrIt.next(); // { value: 'b', done: false }
arrIt.next(); // { value: 'c', done: false }
arrIt.next(); // { value: 'd', done: false }
arrIt.next(); // { value: 'e', done: true }
```

Another example is use a generator to add property to object and of this way create a special prop to iterate it:

```javascript
let myObject = {
  1: 'one',
  2: 'two',
  3: 'three',
};

// adding the `Symbol.iterator` to object:
myObject[Symbol.iterator] = function* () {
  for (let i = 1; i < 4; i++) {
    yield this[i];
  }
};

for (let v of myObject) {
  console.log(v);
}
// one
// two
// three
```

### Comunicate between generators

The last topic to touch on before concluding the topic of generators is the fact that generators allow two way communication. So we have seen our value is passed out of a function, when invoke it in the dot next method but can also pass a value into the function using dot next; consider the next example about this:

```javascript
function* yieldConsole() {
  let val = yield 'Enter a value: ';
  console.log(val);
}

let it = yieldConsole();
let promp = it.next().value;
console.log(promp); // Enter a value:

it.next('Pass a single string'); // { valiue: undefined, done: false }
```
