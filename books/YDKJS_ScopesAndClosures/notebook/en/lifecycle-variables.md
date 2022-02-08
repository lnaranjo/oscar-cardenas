# The (Not So) Secret Lifecycle of Variables

## Hoisting

The term most commonly used for a variable being visible from the beginning of its enclosing `scope`, even though its declaration may appear further down in the `scope`, is called `hoisting`.

Rather than hoisting being a concrete execution step the JS engine performs, it’s more useful to think of hoisting as a visualization of various actions JS takes in setting up the program before execution.

```javascript
var greeting; // hoisted declaration
greeting = 'Hello!'; // the original line 1
console.log(greeting); // Hello!
greeting = 'Howdy!'; // `var` is gone!
```

Hoisting as a mechanism for re-ordering code may be an attractive simplification, but it’s not accurate. The JS engine doesn’t actually re-arrange the code. It can’t magically look ahead and find declarations; the only way to accurately find them, as well as all the scope boundaries in the program, would be to fully parse the code.

### Declaration vs Expression

Function hoisting only applies to formal function declarations (specifically those which appear outside of blocks. Depending on your JS environment, the error message would say something like, `undefined is not a function`, or more helpfully, `greeting is not a function`.

```javascript
greeting(); // TypeError

var greeting = function greeting() {
  console.log('Hello!');
};
```

### Variable Hoisting

Using variable `hoisting` of this sort probably feels unnatural, and many readers might rightly want to avoid relying on it in their programs.

## Re-declaration?

What do you think happens when a variable is declared more than once in the same scope?

```javascript
var studentName = 'Frank';
console.log(studentName); // Frank

var studentName;
console.log(studentName); // ???
```

If you consider this program from the perspective of the hoisting, the code would be re-arranged like this for execution purposes:

```javascript
var studentName;
var studentName; // clearly a pointless no-op!

studentName = 'Frank';

console.log(studentName); // Frank
console.log(studentName); // Frank
```

This is of course a stylistic opinion, not really a technical argument. Many developers agree with the position, and that’s probably in part why TC39 included the error (as well as let conforming to const). But a reasonable case could have been made that staying consistent with var’s precedent was more prudent, and that such opinion-enforcement was best left to opt-in tooling like linters.

## Uninitialized Variables (aka, TDZ)

With var declarations, the variable is “hoisted” to the top of its scope. But it’s also automatically initialized to the undefined value, so that the variable can be used throughout the entire scope. However, let and const declarations are not quite the same in this respect.

```javascript
console.log(studentName); // ReferenceError

let studentName = 'Suzy';
```

The result of this program is that a `ReferenceError` is thrown on the first line. Depending on your JS environment, the error message may say something like: `Cannot access studentName before initialization`.

## Finally Initialized

Working with variables has much more nuance than it seems at first glance. Hoisting, (re)declaration, and the TDZ are common sources of confusion for developers, especially those who have worked in other languages before coming to JS.

Hoisting is generally cited as an explicit mechanism of the JS engine, but it’s really more a metaphor to describe the various ways JS handles variable declarations during compilation.

Declaration and re-declaration of variables tend to cause confusion when thought of as runtime operations. But if you shift to compile-time thinking for these operations, the quirks and shadows diminish.

The `TDZ (temporal dead zone)` error is strange and frustrating when encountered. Fortunately, `TDZ` is relatively straightforward to avoid if you’re always careful to place `let/const` declarations at the top of any scope.
