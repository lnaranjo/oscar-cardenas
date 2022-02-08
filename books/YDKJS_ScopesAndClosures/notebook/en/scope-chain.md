# The Scope Chain

We can say that `scope chain` is the procedure to keep track of the execution references in the stack, that is to say, it allows us to have a traceability of which is the order and context where the code statements will be executed.

## Shadowing

This refers to the possibility of using the same variable definition under two different scopes and obtaining different results.

Let's look at the following example to represent the above.

```javascript
var studentName = 'Suzy';

function printStudent(studentName) {
  studentName = studentName.toUpperCase();
  console.log(studentName);
}

printStudent('Frank');
// FRANK
printStudent(studentName);
// SUZY
console.log(studentName);
// Suzy
```

### Global Unshadowing Trick

We can use variables declared in a different scope within a nested scope, determined by the first definition made in this regard.

Consider the following script for further explanation:

```javascript
var studentName = 'Suzy';
function printStudent(studentName) {
  console.log(studentName);
  console.log(window.studentName);
}
printStudent('Frank');
// "Frank"
// "Suzy"
```

### Copying Is Not Accessing

```javascript
var special = 42;
function lookingFor(special) {
  var another = {
    special: special,
  };
  function keepLooking() {
    var special = 3.141592;
    console.log(special);
    console.log(another.special); // Ooo, tricky!
    console.log(window.special);
  }
  keepLooking();
}
lookingFor(112358132134);
// 3.141592
// 112358132134
// 42
```

In the previous example we see the reference to the variable `special` where we can observe 3 different behaviors and ways of accessing the same values.

## Function Name Scope

A function declaration will create an identifier in the surrounding scope (in this case, the global scope).

One major difference between function declarations and function expressions is what happens to the name identifier of the function. Consider a named function expression:

```javascript
var askQuestion = function ofTheTeacher() {
  // ..
};
```

We know askQuestion ends up in the outer scope. But what about the ofTheTeacher identifier? For formal function declarations, the name identifier ends up in the outer/enclosing scope, so it may be reasonable to assume that’s true here. But ofTheTeacher is declared as an identifier inside the function itself:

```javascript
var askQuestion = function ofTheTeacher() {
  console.log(ofTheTeacher);
};
askQuestion();
// function ofTheTeacher()...
console.log(ofTheTeacher);
// ReferenceError: ofTheTeacher is not defined
```

## Arrow Functions

In ES6 an additional declaration was added for the arrow functions, which does not require the reserved word `function` in the declaration of the same, besides it is not necessary to add `return` in the case where it is required to return some derived value.

The particularity of these functions is that they are lexically anonymous, that is, they have no direct relation with the identifier that references the function.

```javascript
var askQuestion = () => {
  // ..
};
askQuestion.name; // askQuestion
```

However, there is a particularity that allows you to create multiple and complex ways of declaring the same function by using syntax abbreviations, as we can see in the following example:

```javascript
() => 42;
(id) => id.toUpperCase();
(id, name) => ({ id, name });
(...args) => {
  return args[args.length - 1];
};
```

Finally, one of the most common errors is related to the claim that arrow functions behave differently with respect to `lexical scope` than functions that use `function` for their declaration.

In addition to being anonymous and having no declarative form, they have the same `lexical scope` rules as `function` functions.
