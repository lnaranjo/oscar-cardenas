# ¿Qué es el scope?

## Compiling vs Interpreter

Code compilation is a set of steps that process the text of your code and convert it into a list of instructions that the computer can understand. Typically, all of the source code is transformed at once, and the resulting instructions are saved as output (usually in a file) that can be executed later.

Interpretation performs a similar task to compilation in that it transforms your program into machine-understandable instructions machine-understandable instructions. But the processing model is different. Unlike a program that is compiled all at once, with interpretation the source code is transformed line by line; each line or statement is executed before immediately proceeding to process the next line of source code.

## Compiling Code

- `Tokenizing/Lexing`: breaking up a string of characters into meaningful (to the language) chunks, called tokens.

- `Parsing`: taking a stream (array) of tokens and turning it into a tree of nested elements, which collectively
  represent the grammatical structure of the program.
- `Code Generation`: taking an AST and turning it into executable code. This part varies greatly depending on the language, the platform it’s targeting, and other factors.

### Early Errors

```javascript
console.log('Howdy');
saySomething('Hello', 'Hi');

// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context
function saySomething(greeting, greeting) {
  'use strict';
  console.log(greeting);
}
```

### Hoisting

```javascript
function saySomething() {
  var greeting = 'Hello';
  {
    greeting = 'Howdy'; // error comes from here
    let greeting = 'Hi';
    console.log(greeting);
  }
}
saySomething();
// ReferenceError: Cannot access 'greeting' before
// initialization
```

## Compiling speak

How does the JS engine identify variables and determine the scopes of a program while compiling?

By using `targets` and `sources` it is possible to know what is an assignment and a reference to a target. A target is usually easy to identify when a procedure occurs at compile time.

## Runtime Scope Modifications

There are two techniques for modifying a program during runtime, which SHOULD NOT BE USED, as they are confusing and dangerous. Although it is important to be aware of them for when they are encountered in the future: : `eval` and `with`

The `eval(..)` function receives a string of code to compile and execute on the fly during the program runtime. If that string of code has a var or function declaration in it, those declarations will modify the current scope.

La función `with(..)` esencialmente convierte dinámicamente un objeto en un ámbito local sus propiedades son tratadas como identificadores en el bloque de ese nuevo ámbito.

## Lexical Scope

The lexical is associated with the "lexing" compilation stage. The `lexical scope` is that it is controlled entirely by the placement of functions, blocks and variable declarations, in relation to each other.
