# Limiting Scope Exposure

## Least Exposure

Software engineering articulates a fundamental discipline, typically applied to software security, called `The Principle of Least Privilege` (POLP) and a variation of this principle that applies to our current discussion is typically labeled as `Least Exposure` (POLE).

POLP expresses a defensive posture to software architecture: components of the system should be designed to function with least privilege, least access, least exposure.

When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise:

- **Naming Collisions**: if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope (like the global scope), then name collision occurs, and it’s very likely that bugs will occur as one part uses the variable/function in a way the other part doesn’t expect.

- **Unexpected Behavior**: if you expose variables/functions whose usage is otherwise private to a piece of the program, it allows other developers to use them in ways you didn’t intend, which can violate expected behavior and cause bugs.

- **Unintended Dependency**: if you expose variables/functions unnecessarily, it invites other developers to use and depend on those otherwise private pieces. While that doesn’t break your program today, it creates a refactoring hazard in the future, because now you cannot as easily refactor that variable or function without potentially breaking other parts of the software that you don’t control.

## Hiding in Plain (Function) Scope

It should now be clear why it’s important to hide our variable and function declarations in the lowest (most deeply nested) scopes possible. But how do we do so? We’ve already seen the let and const keywords, which are block scoped declarators. That can easily be done by wrapping a function scope around a declaration.

```javascript
var cache = {};
function factorial(x) {
  if (x < 2) return 1;
  if (!(x in cache)) {
    cache[x] = x * factorial(x - 1);
  }
  return cache[x];
}

factorial(6); // 720
cache;
// {
// "2": 2,
// "3": 6,
// "4": 24,
// "5": 120,
// "6": 720
// }
factorial(7); // 5040
```

Now, let see how is working when intentionally we hidden the cache:

```javascript
// outer/global scope
function hideTheCache() {
  // "middle scope", where we hide `cache`
  var cache = {};
  return factorial;
  // **********************
  function factorial(x) {
    // inner scope
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }
    return cache[x];
  }
}

var factorial = hideTheCache();
factorial(6); // 720
factorial(7); // 5040
```

## Scoping with Blocks

In general, any curly-brace pair `{}` which is a statement will act as a `block`, but not necessarily as a scope. A `block` only becomes a scope if necessary, to contain its `block scoped` declarations.

```javascript
{
  // not necessarily a scope (yet)
  // ..
  // now we know the block needs to be a scope
  let thisIsNowAScope = true;
  for (let i = 0; i < 5; i++) {
    // this is also
    if (i % 2 == 0) {
      // this is just a block, not a scope
      console.log(i);
    }
  }
}
// 0 2 4
```

Un `scope` de bloque explícito puede ser útil incluso dentro de otro bloque
(tanto si el bloque exterior es un `scope` como si no):

```javascript
if (somethingHappened) {
  // this is a block, but not a scope
  {
    // this is both a block and an
    // explicit scope
    let msg = somethingHappened.message();
    notifyOthers(msg);
  }
  // ..
  recoverFromSomething();
}
```

## Function Declarations in Blocks

Functions declared in `FiB` blocks are a peculiarity of JS, since they behave similarly to what would happen using `var` for variables.

The JS specification says that function declarations inside of `blocks` are `block-scoped`, so the answer is `ReferenceError`. However, most browser-based JS engines (including v8, which comes from Chrome but is also used in Node), teh answer is `TypeError` the meaning the identifier is `scoped` outside the if `block` but the function value is not automatically initialized, so it remains `undefined`.

## Blocked Over

The point of `lexical scoping` rules in a programming language is so we can appropriately organize our program’s variables, both for operational as well as semantic code communication purposes. And one of the most important organizational techniques is to ensure that no variable is `over-exposed` to unnecessary `scopes` (POLE).
