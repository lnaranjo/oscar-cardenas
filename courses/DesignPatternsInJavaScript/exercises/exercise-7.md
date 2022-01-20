# Exercise 7

### Objective

Consider the code presented below. We have two classes called SingleValue and ManyValues. SingleValue stores just one numeric value (initialized in the constructor), but ManyValues can store either numeric values or SingleValue objects (assume it implements a push() method for adding items).

You are asked to write a function called sum that takes an array of items (any item can be either SingleValue or ManyValues).

## Solution

```javascript
class SingleValue {
  constructor(value) {
    // todo
    this.value = value;
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this.value,
        done: returned++,
      }),
    };
  }
}

let sum = function (containers) {
  // todo
  let result = 0;
  for (let c of containers) {
    for (let i of c) {
      result += i;
    }
  }
  return result;
};
```
