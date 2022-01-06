# Exercise 0

### Definition

What would it take to make it asynchronous using setTimeout?

The objective is pass the next code:

```javascript
const students = [
  { name: 'Mary', score: 90, school: 'East' },
  { name: 'James', score: 100, school: 'East' },
  { name: 'Steve', score: 40, school: 'East' },
  { name: 'Gabe', score: 90, school: 'West' },
  { name: 'Rachel', score: 85, school: 'East' },
  { name: 'Rochelle', score: 95, school: 'West' },
  { name: 'Lynette', score: 75, school: 'East' },
];

function processStudents(items = [], callback) {
  for (let item of items) {
    if (item.school.toLowerCase() === 'east') {
      typeof callback === 'function' && callback(item);
    }
  }
}

console.log('Before determineTotal');

function determineTotal() {
  let total = 0;
  let count = 0;

  processStudents(students, function ({ score }) {
    total += score;
    count++;
  });

  console.log('Total Score: ' + total + ' - Total Count: ' + count);
}

determineTotal();

console.log('End of code');
```

With the current output:

```
Before determineTotal
Total Score: 390 - Total Count: 5
End of code
```

To follow output:

```
Before determineTotal
End of code
Total Score: 390 - Total Count: 5
```

### Resolution

One way is modify `processStudents` method adding a `setTimeout` to wrap callback execution to run asychronous:

```javascript
function processStudents(items = [], callback) {
  ...
      typeof callback === 'function' && setTimeout(callback, 0, item);
  ...
}
```

This change dont works, because the execution in the `console.log` is synchronous and the scope changes, so return the following output:

```
Before determineTotal
Total Score: 0 - Total Count: 0
End of code
```

Another way is modify `determineTotal` method adding a `setTimeout` to wrap `processStudents`, but exists two arguments:

```javascript
function determineTotal(items = [], callback) {
  ...
  setTimeout(processStudents, 0, ...)
  ...
}
```

So, the best way to convert is wrap `determinateTotal` with the `setTimeout`, because the execution is delayed to enter in the callstack:

```javascript
...
function determineTotal() { ...
...
}
// determineTotal();

setTimeout(determineTotal, 0);
```

And the output is:

```
Before determineTotal
End of code
Total Score: 390 - Total Count: 5
```
