# Best practices

### Strict mode

```javascript
// only whitespace and comments are allowed
// before the use-strict pragma
"use strict";
// the rest of the file runs in strict mode
// ...
```

### Do not reuse variables

```javascript
// declare as a boolean datatype
let isNumber = true;

if (isNumber) {
  // bad: reusable a boolean variable with a new string
  isNumber = "I am a number";
}
```

### Comparisons

```javascript
// using double equals (==) is true, because is a loose strict comparison
42 == "42"; // true
1 == true; // true

// using triple equal (===) is false, because this comparison is strict and
// evaluates the value and datatype
42 === "42"; // false
1 === true; // false
```

### Coersive comparisons

```javascript
const arr = ['1', '10', '100', '1000']

// safe and coersive comparison, because only run 3 times
for (let i = 0; i < arr.length && arr[i] < 500) {
  console.log(arr[i]); // will run 3 times
}

// using alphabetical comparison
let x = '10';
let y = '9';

x < y; // true, because compare string like a dictionary
```
