# Visitor

### Motivation

- Need to define new functionality in an inherited class.
- Do not want to keep modifying each class in the hierarchy.
- Need to access the uncommon aspects of the classes in the hierarchy.
- Create an external component to handle rendering.

### Implementation

We implemented `Intrusive Visitor`:

```javascript
class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  print(buffer) {
    buffer.push(this.value.toString());
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  print(buffer) {
    buffer.push('(');
    this.left.print(buffer);
    buffer.push('+');
    this.right.print(buffer);
    buffer.push(')');
  }
}

// 1 + (2+3)
const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);
const buffer = [];
e.print(buffer);
console.log(buffer.join(''));
```

Implement the `Reflective Visitor`:

```javascript
class NumberExpression {
  constructor(value) {
    this.value = value;
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

class ExpressionPrinter {
  print(e, buffer) {
    if (e instanceof NumberExpression) {
      buffer.push(e.value);
    } else if (e instanceof AdditionExpression) {
      buffer.push('(');
      this.print(e.left, buffer);
      buffer.push('+');
      this.print(e.right, buffer);
      buffer.push(')');
    }
  }
}

const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);
const buffer = [];
const ep = new ExpressionPrinter();
ep.print(e, buffer);
console.log(buffer.join(''));
```

We implemented `Classic Visitor`:

```javascript
class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  accept(visitor) {
    visitor.visitNumber(this);
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class Visitor {
  constructor() {
    this.buffer = [];
  }
}

class ExpressionPrinter extends Visitor {
  constructor() {
    super();
  }

  visitNumber(e) {
    this.buffer.push(e.value);
  }

  visitAddition(e) {
    this.buffer.push('(');
    e.left.accept(this);
    this.buffer.push('+');
    e.right.accept(this);
    this.buffer.push(')');
  }

  toString() {
    return this.buffer.join('');
  }
}

class ExpressionCalculator {
  // this visitor is stateful which can lead to problems
  constructor() {
    this.result = 0;
  }

  visitNumber(e) {
    this.result = e.value;
  }

  visitAddition(e) {
    e.left.accept(this);
    let temp = this.result;
    e.right.accept(this);
    this.result += temp;
  }
}

const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);

const ep = new ExpressionPrinter();
ep.visitAddition(e);

const ec = new ExpressionCalculator();
ec.visitAddition(e);

console.log(`${ep.toString()} = ${ec.result}`);
```

### Summary

- Propagate the accept method throughout the hierarchy.
- Create a visitor for each element in the inheritance.
