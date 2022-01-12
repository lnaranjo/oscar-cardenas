# Builder

When piecewise object construction is complicated, provide an API for doing it succinctly

## Motivation

- Some objects are simple and can be created in a single initializer call.
- Other objects require a lot of ceremony to create.
- Having an object with "N" initializer arguments is not productive.
- Instead, opt for piecewise constuction.
- Builder provides an API for constructing an object step-by-step

## Examples

### Builder Basic Example

```javascript
class Tag {
  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent) {
    let html = [];
    let i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    for (let child of this.children) html.push(child.toStringImpl(indent + 1));

    html.push(`${i}</${this.name}>\n`);
    return html.join();
  }

  toString() {
    return this.toStringImpl(0);
  }
}
```

### Builder an initializer or return it via a static function

```javascript
class Tag {
  ...

  static get indentSize() {
    return 2;
  }

  static create(name) {
    return new HtmlBuilder(name);
  }
}
```

### Make Fluent

To make fluent is possible when inside the methods return the same instance

```javascript
class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  // non-fluent
  addChild(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  // fluent, return this
  addChildFluent(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}

const builder = Tag.create('ul');
builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'baz');
```

## Summary

- A builder is a separate component for building an object
- Can either give a builder an initializer or return it via a static function
- To make builder fluent, retun self
- Different faces of an object can be build with different builders working in tandem via a base class
