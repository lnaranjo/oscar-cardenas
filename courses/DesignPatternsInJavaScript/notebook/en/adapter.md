# Adapter

An adapter is a constructor that adapts from an already created interface.

### Implementation

Let's see how it is possible to implement this principle with examples of adapters.

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  toString() {
    return `${this.start.toString()}→${this.end.toString()}`;
  }
}

class VectorObject extends Array {}

class VectorRectangle extends VectorObject {
  constructor(x, y, width, height) {
    super();
    this.push(new Line(new Point(x, y), new Point(x + width, y)));
    this.push(
      new Line(new Point(x + width, y), new Point(x + width, y + height))
    );
    this.push(new Line(new Point(x, y), new Point(x, y + height)));
    this.push(
      new Line(new Point(x, y + height), new Point(x + width, y + height))
    );
    this.push;
  }
}
```

Now let's create the adapter from the already created interface.

```javascript
class LineToPointAdapter extends Array {
  constructor(line) {
    super();
    console.log(
      `${LineToPointAdapter.count++}: Generating ` +
        `points for line ${line.toString()} (no caching)`
    );

    let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y <= bottom; ++y) {
        this.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        this.push(new Point(x, top));
      }
    }
  }
}
LineToPointAdapter.count = 0;
```

Then let's use the adapter to reach the desired result.

```javascript
const vectorObjects = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 6, 6),
];

const drawPoint = function (point) {
  process.stdout.write('.');
};

const drawPoints = function () {
  for (let vo of vectorObjects)
    for (let line of vo) {
      const adapter = new LineToPointAdapter(line);
      adapter.forEach(drawPoint);
    }
};

drawPoints();
drawPoints();
```

### Summary

- The implementation tends to be simple.
- It is determined by the API you have and the API you need.
- You must create a component that references the adapter.
- We can use a cache system and other optimizations when accumulating components.
