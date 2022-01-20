# Exercise 6

### Objective

You are given an example of an inheritance hierarchy which results in Cartesian-product duplication.

Please refactor this hierarchy, giving the base class Shape a constructor that takes a renderer, whose expected interface is:

### Solution

```javascript
class Shape {
  constructor(renderer, name) {
    this.renderer = renderer.whatToRenderAs;
    this.name = name;
  }

  toString() {
    return `Drawing ${this.name} as ${this.renderer}`;
  }
}

class Circle extends Shape {
  constructor(renderer) {
    super(renderer, 'circle');
  }
}

class Square extends Shape {
  constructor(renderer) {
    super(renderer, 'square');
  }
}

class Triangle extends Shape {
  constructor(renderer) {
    super(renderer, 'triangle');
  }
}

class VectorRenderer {
  get whatToRenderAs() {
    return 'lines';
  }
}

class RasterRenderer {
  get whatToRenderAs() {
    return 'pixels';
  }
}
```
