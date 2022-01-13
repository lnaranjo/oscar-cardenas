# Callbacks

The `callbacks` are very important to extend functionalities and allow code reuse and avoid redundant and repetitive code. The original premise of the `callbacks` is the possibility of being sent as parameters and executed in the target function, in order not to block the execution thread and to behave asynchronously.

Let's see a basic definition of a `callback`, where the `logCall` function is sent as the first parameter of the `setTimeout` function where it will be executed one second later:

```javascript
// define a function will be my callback
const logCall = function () {
  console.log('Logging inside logCall');
};

// pass the logCall function as a callback for setTimeout
setTimeout(logCall, 1000);
```

One of the most frequent uses of callbacks is related to DOM management, to reuse functions and send them as parameters, as for example in the listeners functions, let's see the following example:

```javascript
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

Let's see an example where we define a function that receives a `callback` to execute it every time the condition that the `school` field is equal to `east`:

```javascript
function processStudents(items = [], callback) {
  for (let item of items) {
    if (item.school.toLowerCase() === 'east') {
      typeof callback === 'function' && callback(item);
    }
  }
}
```

We will use the following array of objects to perform the search, where each index contains fields to perform the operations in the function defined above:

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
```

When we use the function we send it two parameters:

- In the first parameter we will send the object array, which is the structure to which we will apply the changes.
- In the second parameter we will send the function that will be executed as the `callback` in which we will make a `console.log` when the score is higher than 60

```javascript
processStudents(students, function ({ name, score }) {
  score >= 60 && console.log(`${name} passed!`);
});
```

Sometimes, it is possible to execute callbacks inside other functions in order not to block the execution thread, consider the following example:

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

### `Callbacks` problems

Now, it is time to talk about the problems with the `callbacks`, which are mainly found in two points:

- **`callback hells`**: This problem mainly refers to the nesting in multiple levels, making it not very scalable and unpredictable..
- **`Inversion of Control`**: When the code is executed, it is difficult to take control after the execution process has been started, which limits the possibility to search errors or performance improvements.
