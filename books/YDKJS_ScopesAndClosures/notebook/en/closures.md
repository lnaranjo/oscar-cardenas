# Closures

## See the Closure

`Closure` is a behavior of functions and only functions. If you aren’t dealing with a function, `closure` does not apply. An object cannot have `closure`, nor does a class have `closure` (though its functions/methods might). Only functions have `closure`.

For `closure` to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined. A function executing in the same scope it was defined would not exhibit any observably different behavior with or without `closure` being possible; by the observational perspective and definition, that is not `closure`.

```javascript
function lookupStudent(studentID) {
  var students = [
    { id: 14, name: 'Kyle' },
    { id: 73, name: 'Suzy' },
    { id: 112, name: 'Frank' },
    { id: 6, name: 'Sarah' },
  ];

  return function greetStudent(greeting) {
    var student = students.find((student) => student.id == studentID);
    return `${greeting}, ${student.name}!`;
  };
}
var chosenStudents = [lookupStudent(6), lookupStudent(112)];

// accessing the function's name:
chosenStudents[0].name; // greetStudent
chosenStudents[0]('Hello'); // Hello, Sarah!
chosenStudents[1]('Howdy'); // Howdy, Frank!
```

## The Closure Lifecycle and Garbage Collection (GC)

Since closure is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference to that function.

If ten functions all close over the same variable, and over time nine of these function references are discarded, the lone remaining function reference still preserves that variable. Once that final function reference is discarded, the last closure over that variable is gone, and the variable itself is GC’d

```javascript
function manageBtnClickEvents(btn) {
  var clickHandlers = [];
  return function listener(cb) {
    if (cb) {
      let clickHandler = function onClick(evt) {
        console.log('clicked!');
        cb(evt);
      };
      clickHandlers.push(clickHandler);
      btn.addEventListener('click', clickHandler);
    } else {
      // passing no callback unsubscribes
      // all click handlers
      for (let handler of clickHandlers) {
        btn.removeEventListener('click', handler);
      }
      clickHandlers = [];
    }
  };
}
// var mySubmitBtn = ..
var onSubmit = manageBtnClickEvents(mySubmitBtn);

// handle checkout
onSubmit(function checkout(evt) {});

// log action to analytics
onSubmit(function trackAction(evt) {});

// later, unsubscribe all handlers:
onSubmit();
```

Conceptually, closure is per variable rather than per scope. Ajax callbacks, event handlers, and all other forms of function closures are typically assumed to close over only what they explicitly reference.

```javascript
function manageStudentGrades(studentRecords) {
  var grades = studentRecords.map(getGrade);
  return addGrade;
  // ************************

  function getGrade(record) {
    return record.grade;
  }

  function sortAndTrimGradesList() {
    // sort by grades, descending
    grades.sort(function desc(g1, g2) {
      return g2 - g1;
    });
    // only keep the top 10 grades
    grades = grades.slice(0, 10);
  }

  function addGrade(newGrade) {
    grades.push(newGrade);
    sortAndTrimGradesList();
    return grades;
  }
}
var addNextGrade = manageStudentGrades([
  { id: 14, name: 'Kyle', grade: 86 },
  { id: 73, name: 'Suzy', grade: 87 },
  { id: 112, name: 'Frank', grade: 75 },
  // ..many more records
  { id: 6, name: 'Sarah', grade: 91 },
]);

// later
addNextGrade(81);
addNextGrade(68);
// [ .., .., ... ]
```

## An Alternative Perspective

Reviewing our working definition for closure, the assertion is that functions are "first-class values" that can be passed around the program, just like any other value. Closure is the link-association that connects that function to the scope/variables outside of itself, no matter where that function goes.

This alternative model for closure does affect whether we classify synchronous callbacks as examples of closure or not.

## Closer to Closure

We explored two models for mentally tackling closure:

- **Observational**: closure is a function instance remembering its outer variables even as that function is passed to and invoked in other scopes.
- **Implementational**: closure is a function instance and its scope environment preserved in-place while any references to it are passed around and invoked from other scopes.

Summarizing the benefits to our programs:

- Closure can improve efficiency by allowing a function instance to remember previously determined information instead of having to compute it each time.
- Closure can improve code readability, bounding scopeexposure by encapsulating variable(s) inside function instances, while still making sure the information in those variables is accessible for future use. The resultant narrower, more specialized function instances are cleaner to interact with, since the preserved information doesn’t need to be passed in every invocation.
