# Exercise 3

### Objective

The objective is transform the next sync function:

```javascript
const massiveProcess = function (num) {
  let result = 0;
  for (let i = num ** 7; i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
  return result;
};
```

Because the proces take many time to complete and stop the execution, so is necessary change to promise function type. If the function is executed as a actual type, the output is:

```javascript
let amt = massiveProcess(10);
console.log('The number is: ' + amt);

// more processing later on
console.log(5 * 5 + 100);
```

The output is the next:

```text
> The number is: -2898550.376692899
> 125
```

### Resolution

> Transform the funtion using a `Promise`:

```javascript
const massiveProcess = function (num) {
  return new Promise(function (resolve, reject) {
    if (isNaN(num)) {
      return reject('num must be a number');
    }
    let result = 0;
    for (let i = num ** 7; i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    }
    resolve(result);
  });
};
```

> Now, check it the function, calling first the `massiveProcess` and second the `console.log`:

```javascript
massiveProcess(10)
  .then((result) => console.log(`The number is: ${result}`))
  .catch(console.error);

// more processing later on
console.log(5 * 5 + 100);
```

> An important thing is the datatype validation in the promise, this validation reject if the num is not a valid number, for example:

```javascript
massiveProcess('lego')
  .then((result) => console.log(`The number is: ${result}`))
  .catch(console.error); // catch will be executed and show the error in console
```
