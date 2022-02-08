# Around the Global Scope

The `global scope` of a JS program is a rich topic, with much more utility and nuance than you probably realize. Fully understanding `global scope` is critical to mastering the use of `lexical scope` to structure your programs.

## Why Global Scope?

Regarding the browser, there are 3 main ways to execute a program.

The first way is by using ES Modules directly (without transpiling) and loading them individually by the JS environment.

The second is using some `builder` as a file bundler to deliver to the JS engine only one process by using a large file.

Let's see a possibility of compilation resulting from a process by a `builder`:

```javascript
(function wrappingOuterScope() {
  var moduleOne = (function one() {
    // ..
  })();
  var moduleTwo = (function two() {
    // ..
    function callModuleOne() {
      moduleOne.someMethod();
    }
    // ..
  })();
})();
```

The third one has to do with the use of a tool that allows individual loading through the use of `<script>` tags or some other dynamic resource loading system.

Now let's see how it would look like using the third way:

```javascript
var moduleOne = (function one() {
  // ..
})();
var moduleTwo = (function two() {
  // ..
  function callModuleOne() {
    moduleOne.someMethod();
  }
  // ..
})();
```

## Where Exactly is this Global Scope?

There are different `global scopes` in JS, depending on where the program will run, i.e., normally you can say that JS can run mainly in a `Node` environment or in a `Browser` environment.

### Globals Shadowing Globals

One form of prevention related to global declarations is to use `let` and `const` for a block-oriented scope. Otherwise you run the risk of overwriting variables that are in different scopes.

### DOM Globals

There is the possibility of creating variables derived from the DOM where their scope is global and is determined by the use of an `id`. Let's see the following example:

```html
<ul id="my-todo-list">
  <li id="first">Write a book</li>
  ..
</ul>
```

We can access the list reference using the window object identifier as follows:

```javascript
first;
// <li id="first">..</li>
window['my-todo-list'];
// <ul id="my-todo-list">..</ul>
```

### What’s in a (Window) Name?

When we define a variable by using `var` the scope assigned by default is the global one and it is incorporated as a property of `Window`, which refers to a "normal" behavior. But what happens if that same variable is reassigned another value by means of `Window`? Something strange happens and that is that it takes the data type with which it was originally created. Let's see an example:

```javascript
var legos = 'legos';
typeof legos; // string
window.legos = 42;
typeof legos; // string
```

### Web Workers

Web Workers are a web platform extension on top of browserJS behavior, which allows a JS file to run in a completely separate thread (operating system wise) from the thread that’s running the main JS program.

In a Web Worker, the global object reference is typically made using self:

```javascript
var studentName = 'Oscar';
let studentID = 42;
function hello() {
  console.log(`Hello, ${self.studentName}!`);
}
self.hello();
// Hello, Oscar!
self.studentID;
// undefined
```

### Developer Tools Console/REPL

During the development experience (DX) it is important to be able to create scripts in order to test a desired functionality, in these cases the scope that will be created is a `global scope`.

### ES Modules (ESM)

With the introduction of `ES Modules` it is possible to preserve the original scope without affecting the behavior of how the `top-level` is observed. By using `export` it is possible to make calls in another context without altering that of that code fragment.

```javascript
var studentName = 'Oscar';
function hello() {
  console.log(`Hello, ${studentName}!`);
}

hello(); // Hello, Oscar!

export hello;
```

## Node

With Node it happens that a `script` can be interpreted by using `CommonJS`, the practical effect is that the programs are never in the `global scope`. Let's see the following example that can exemplify the above mentioned, it is necessary to clarify that it is for reasons of explanation since at the moment it is not the used thing

```javascript
function Module(module, require, __dirname) {
  var studentName = 'Kyle';
  function hello() {
    console.log(`Hello, ${studentName}!`);
  }
  hello();
  // Hello, Kyle!
  module.exports.hello = hello;
}
```

## Global `this`

A function can be dynamically constructed from code stored in a string value with the `Function()` constructor, similar to `eval(..)`.

```javascript
const theGlobalScopeObject = new Function('return "hello"')();
console.log(theGlobalScopeObject()); // hello
```

As of ES2020, JS has finally defined a standardized reference to the global scope object, called `globalThis`. So, subject to the recency of the JS engines your code runs in, you can use `globalThis` in place of any of those other approaches. We could even attempt to define a cross-environment polyfill that’s safer across pre-`globalThis` JS environments, such as:

```javascript
const theGlobalScopeObject =
  typeof globalThis != 'undefined'
    ? globalThis
    : typeof global != 'undefined'
    ? global
    : typeof window != 'undefined'
    ? window
    : typeof self != 'undefined'
    ? self
    : new Function('return this')();
```
