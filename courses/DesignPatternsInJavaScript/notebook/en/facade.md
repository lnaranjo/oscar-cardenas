# Façade

It provides a simple way to understand and use a user interface in a long and sophisticated code.

### Implementation

```javascript
class Buffer extends Array {
  constructor(width = 30, height = 20) {
    super();
    this.width = width;
    this.height = height;
    this.alloc(width * height);
  }

  write(text, position = 0) {}
}

class Viewport {
  constructor(buffer = new Buffer()) {
    this.buffer = buffer;
    this.offset = 0;
  }

  // high-level
  append(text, pos) {
    this.buffer.write(text, pos + this.offset);
  }

  getCharAt(index) {
    return this.buffer[this.offset + index];
  }
}

class Console {
  constructor() {
    this.buffer = new Buffer();
    this.currentViewport = new Viewport(this.buffer);
    this.buffers = [this.buffer];
    this.viewports = [this.currentViewport];
  }

  // high-level
  write(text) {
    this.currentViewport.buffer.write(text);
  }

  // low-level
  getCharAt(index) {
    return this.currentViewport.getCharAt(index);
  }
}

const c = new Console();
c.write('hello');
const ch = c.getCharAt(0);
```

### Summary

- Build a `Façade` to provide a simplified API over a set of classes.
- May wish to expose internals through the `façade`.
- May allow users to escalate to use more complex APIs if the need to.
