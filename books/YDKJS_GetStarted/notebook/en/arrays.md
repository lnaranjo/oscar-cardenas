# Arrays

An array is a order data structure, use a 0-based indexes which each can be represent any data type.

### Considerations:

- The size of array is provides in the `length` property, this is the total size independently of content of values.
- The first index is represented by `0` and the last element is determinated by `length - 1`.
- JS provides some methods to manipulate the values, reorganize and return new array structures after a previous tratement.

### Simple declaration:

```javascript
// can be declared as a empty array
const myArray = [];

// initialize an array
const initializedArray = [1, 2, 3, 4, 5];
```

### Access to specific index in array

```javascript
const letters = ['a', 'b', 'c', 'd', 'e'];

// get first element
letters[0];

// get the `c` letter:
letters[2];

// get the `e` letter
letters[4];
// or in this case is the last element, can be use:
letters[letters.length - 1];
```

### Some methods to manipulate data in array:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map: returns an array with the squared numbers
const squaredNumbers = numbers.map((number) => number * number);
console.log(squaredNumbers); // [1, 4, 9, 16, 25, 36, 64, 81, 100]

// filter: returns a new array with elements matched with condition in the callback
const oddNumbers = numbers.filter((number) => !!(number % 2));
console.log(oddNumbers); // [1, 3, 5, 7, 9]

const evenNumbers = numbers.filter((number) => !(number % 2));
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// reduce: returns another array also others datatype after callback.
const sumAllValues = numbers.reduce(
  (accumulator, number) => (accumulator += number),
  0
);
console.log(sumAllValues); // 55
```
