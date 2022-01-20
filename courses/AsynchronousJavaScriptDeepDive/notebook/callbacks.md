# Callbacks

The `callbacks` are very important to extends functionalities and may the possibility to reuse code and prevent the code redundant.

A `callback` can be define as a single function and pass as an argument in another function, for example:

```javascript
// define a function will be my callback
const logCall = function () {
  console.log('Logging inside logCall');
};

// pass the logCall function as a callback for setTimeout
setTimeout(logCall, 1000);
```

In the previous example, `logCall` will be executed after one second.

> Also, in the DOM events is possible to use a callback to register a click instaced of multiples buttons, for examples:

```javascript
// function used as a callback
const listenClickButton = function (event) {
  console.log('Clicked in a button');
};

// get buttons from DOM
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');

// add a listener when clicked and pass the callback listenClickButton
button1.addEventListener('click', listenClickButton);
button2.addEventListener('click', listenClickButton);
```

> Another example is reuse a callback for multiple porpouses, for example:

```javascript
// defines an array to pass and manipulate inside the callback
const students = [
  { name: 'Mary', score: 90, school: 'East' },
  { name: 'James', score: 100, school: 'East' },
  { name: 'Steve', score: 40, school: 'East' },
  { name: 'Gabe', score: 90, school: 'West' },
  { name: 'Rachel', score: 85, school: 'East' },
  { name: 'Rochelle', score: 95, school: 'West' },
  { name: 'Lynette', score: 75, school: 'East' },
];
```

> Now, define the callback:

```javascript
// a function that evaluate the east school's and execute the callback
function processStudents(items = [], callback) {
  for (let item of items) {
    if (item.school.toLowerCase() === 'east') {
      typeof callback === 'function' && callback(item);
    }
  }
}
```

> Call the callback to print the names with a score mayor to 60:

```javascript
processStudents(students, function ({ name, score }) {
  score > 60 && console.log(`${name} passed!`);
});
```

> Or, invoke the callback to count students and sum all scores:

```javascript
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
```

In the previous cases, the callback is reused in two differents approach, but the code is the same

Now, is moment to talk about the problems with callbacks, in the following list exists many point to resume related with the use:

- **Callback hell**: When dealing callbacks, it is the most common (nested callbacks).
- **Difficult to Reason About**: Ocurrs when exits many callbacks and is very difficult to understand, mantein and scalate.
- **Inversion of Control**: Can't turn control of your code over to something else when is launched.
