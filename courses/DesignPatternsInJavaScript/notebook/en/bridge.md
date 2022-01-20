# Bridge

A mechanism that decouples a legacy interface to make an implementation.

### Motivation

- Prevents a product with Cartesian explosion.
- Prevents entity explosion.

### Implementation

Let us consider the `Shape` class as the base class where we will extend the others.

```javascript
class Shape {
  constructor(renderer, name = null) {
    this.renderer = renderer;
    this.name = name;
  }

  toString() {
    return `Drawing ${this.name} as ${this.renderer.whatToRenderAs}`;
  }
}
```

Now let's implement the classes that extend the `Shape` class:

```javascript
class Triangle extends Shape {
  constructor(renderer) {
    super(renderer, 'triangle');
  }
}

class Square extends Shape {
  constructor(renderer) {
    super(renderer, 'square');
  }
}
```

Now let us define the classes with render types:

```javascript
class RasterRenderer {
  get whatToRenderAs() {
    return 'pixels';
  }
}

class VectorRenderer {
  get whatToRenderAs() {
    return 'lines';
  }
}
```

Finally let`s test to verify the behavior of them:

```javascript
describe('facade', function () {
  it('render vector square', function () {
    let sq = new Square(new VectorRenderer());
    expect(sq.toString()).toEqual('Drawing square as lines');
  });

  it('render raster triangle', function () {
    let sq = new Triangle(new RasterRenderer());
    expect(sq.toString()).toEqual('Drawing triangle as pixels');
  });
});
```

### Summary

- Decoupling of abstraction for implementation.
- In both cases there is inheritance.
- A form of strong encapsulation.
