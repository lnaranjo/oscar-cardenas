// can be declared as a empty array
const myArray = [];

// initialize an array
const initializedArray = [1, 2, 3, 4, 5];

const letters = ["a", "b", "c", "d", "e"];

// get first element
letters[0];

// get the `c` letter:
letters[2];

// get the `e` letter
letters[4];
// or in this case is the last element, can be use:
letters[letters.length - 1];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map returns an array with the squared numbers
const multipliedNumbers = numbers.map((number) => number * number);
console.log(multipliedNumbers); // [1, 4, 9, 16, 25, 36, 64, 81, 100]

// filter return a new array with elements matched with condition un the callback
const oddNumbers = numbers.filter((number) => !!(number % 2));
console.log(oddNumbers); // [1, 4, 9, 16, 25, 36, 64, 81, 100]

const evenNumbers = numbers.filter((number) => !(number % 2));
console.log(evenNumbers); // [1, 3, 5, 7, 9]

// reduce
const sumAllValues = numbers.reduce(
  (accumulator, number) => accumulator + number,
  0
);
console.log(sumAllValues); // 55
