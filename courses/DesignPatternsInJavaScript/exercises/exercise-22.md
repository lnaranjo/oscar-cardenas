# Exercise 22

### Objective

You are asked to implement a visitor called ExpressionPrinter for printing different mathematical expressions. The range of expressions covers addition and multiplication - please put round brackets around addition operations (but not multiplication ones)! Also, please avoid any blank spaces in output.

Example:

- Input: AdditionExpression(Value(2), Value(3))
- Output: (2+3)

Here is the corresponding unit test:

```javascript
let simple = new AdditionExpression(new Integer(2), new Integer(3));
let ep = new ExpressionPrinter();
ep.visitAddition(simple);
expect(ep.toString()).toEqual('(2+3)');
```

### Solution

```javascript
class Integer {
  constructor(value) {
    this.value = value;
  }
  accept(visitor) {
    visitor.visitValue(this);
  }
}

class BinaryExpression {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
}

class AdditionExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }
  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class MultiplicationExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }
  accept(visitor) {
    visitor.visitMultiplication(this);
  }
}

class ExpressionPrinter {
  constructor() {
    this.buffer = [];
  }

  visitValue({ value }) {
    this.buffer.push(value);
  }

  visitAddition(ae) {
    this.buffer.push('(');
    ae.lhs.accept(this);
    this.buffer.push('+');
    ae.rhs.accept(this);
    this.buffer.push(')');
  }

  visitMultiplication(me) {
    me.lhs.accept(this);
    this.buffer.push('*');
    me.rhs.accept(this);
  }

  toString() {
    return this.buffer.join('');
  }
}
```
