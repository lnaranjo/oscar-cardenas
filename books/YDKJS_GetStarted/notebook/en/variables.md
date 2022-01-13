# Variables

Existing three types for declaring varables, `var, let, const`. In this part, well be explain the cases that use.

### Considerations:

- `var` is most frecuently used in a global scope, this scope is related with `Window` (in browser) or `Globals` (in nodejs). The value can be changed in the runtime for code, used for old browsers and give us more retro-compatibility.

- `let` frecuently used to define variables with a specific scope, provides mutability in the runtime and prevention to redeclarations. The most popular cases is an example in a for-loop, while statements, etc.

- `const` this declaration type provides inmutability in the runtime, redeclararion and re-assignment of diferents value primitive types. It is most preferible when the code is explained and gives context about the roadmap of data. Also is a recommendable option to declare named functions.

- The scope determines whether the behavior of the variables is global or local.
  - The global scope type allows full access regardless of the variable will be called.
  - While the local scope does not allow access from any point and is bounded by the nearest block in which it was declared.

### Definition with `var`:

```javascript
// var uses in a global scope
var globalVariable = 'This is a global string';

function stuffWithAnotherScope() {
  // Access and prints the follow string: 'This is a global string' in the funcion scope
  console.log(globalVariable);
}

if (someIsTrue) {
  globalVariable = 'Change the original value in a global scope';
}
```

### Definition with `let`:

```javascript
function stuffWithAnotherScope() {
  let someVariable = 'This is our string declared as a let in a var';

  if (somethingHappen) {
    someVariable = 'Changed original string value';
  }
}

// Can't access to variable, because the const was declared inside the body function
console.log(someVariable);
```

### Definition with `const`:

```javascript
function stuffWithAnotherScope() {
    // this is a string saved in a constant variable
    const randomString = 'This is a constant string';
}

// Can't access to variable, because the const was declared inside the body function
console.log(randomString);

// Declare a named function
const myNamedFunction = () => {...}
```
