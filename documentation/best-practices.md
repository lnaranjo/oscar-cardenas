# Best practices

### Strict mode

```javascript
// only whitespace and comments are allowed
// before the use-strict pragma
"use strict";
// the rest of the file runs in strict mode
// ...
```

### Do not reuse variables

```javascript
// declare as a boolean datatype
let isNumber = true;

if (isNumber) {
  // bad: reusable a boolean variable with a new string
  isNumber = "I am a number";
}
```
