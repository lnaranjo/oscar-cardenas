# Exercise 15

### Objective

Given the following definition of a `Node`, please implement preorder traversal right inside Node. The sequence returned should be the sequence of values, not their containing nodes.

### Solution

```javascript
class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;

    if (this.left) left.parent = this;
    if (this.right) right.parent = this;
  }

  *preorder() {
    function* traverse(current) {
      yield current;
      if (current.left) {
        for (let left of traverse(current.left)) yield left;
      }
      if (current.right) {
        for (let right of traverse(current.right)) yield right;
      }
    }
    for (let node of traverse(this)) yield node.value;
  }
}
```
