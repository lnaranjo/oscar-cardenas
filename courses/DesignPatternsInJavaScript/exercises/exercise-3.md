# Exercise 3

### Objective

Given the definitions shown in code, you are asked to implement Line.deepCopy() to perform a deep copy of the given Line object.

This method should return a copy of a Line that contains copies of its start/end points.

### Solution

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    const start = new Point(this.start.x, this.start.y);
    const end = new Point(this.end.x, this.end.y);
    return new Line(start, end);
  }
}
```
