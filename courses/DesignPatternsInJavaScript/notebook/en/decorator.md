# Decorator

It makes it easy to add behaviors to individual objects without the need for inheritance.

### Motivation

- Add functionality to objects.
- No need to alter or rewrite functionality to existing code.
- You want to keep new functionality separate.
- Need to be able to interact with existing structures.

### Implementation

Let's start by defining 3 classes:

```javascript
class Shape {}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class Square extends Shape {
  constructor(side = 0) {
    super();
    this.side = side;
  }

  toString() {
    return `A square with side ${this.side}`;
  }
}
```

In order to be able to add a property, we could define the following classes:

```javascript
// we don't want ColoredSquare, ColoredCircle, etc.
class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} ` + `has the color ${this.color}`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString() {
    return (
      `${this.shape.toString()} has ` +
      `${this.transparency * 100.0}% transparency`
    );
  }
}
```

Implementing the solution using object instances:

```javascript
const circle = new Circle(2);
console.log(circle.toString());

const redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());

const redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());
```

### Summary

- A decorator maintains the reference of the decorated objects.
- By means of fields and methods to increase the objects capabilities.
- It may or may not send calls to the base object.
