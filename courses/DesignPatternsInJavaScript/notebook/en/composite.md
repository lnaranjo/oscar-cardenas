# Composite

### Motivation

- It allows us to create compound objects.
- Some objects can use properties and methods of other objects.
- It is used to handle scalars and uniform composition objects.

### Implementation

Let's start by defining the `GraphicObject` class:

```javascript
class GraphicObject {
  constructor(name = 'Group ' + GraphicObject.count++) {
    this.children = [];
    this.color = undefined;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  print(buffer, depth) {
    buffer.push('*'.repeat(depth));
    if (depth > 0) buffer.push(' ');
    if (this.color) buffer.push(this.color + ' ');
    buffer.push(this.name);
    buffer.push('\n');

    for (let child of this.children) child.print(buffer, depth + 1);
  }

  toString() {
    let buffer = [];
    this.print(buffer, 0);
    return buffer.join('');
  }
}
GraphicObject.count = 0;
```

Now let's define the classes it extends:

```javascript
class Circle extends GraphicObject {
  constructor(color) {
    super('Circle');
    this.color = color;
  }
}

class Square extends GraphicObject {
  constructor(color) {
    super('Square');
    this.color = color;
  }
}
```

Finally we have the instances of the previously defined classes.

```javascript
let drawing = new GraphicObject();
drawing.children.push(new Square('Red'));
drawing.children.push(new Circle('Yellow'));

let group = new GraphicObject();
group.children.push(new Circle('Blue'));
group.children.push(new Square('Blue'));
drawing.children.push(group);

console.log(drawing.toString());
```

Now let's see an example where we have to create a class with dependency of two, for this let's use the following function that allows us to merge both:

```javascript
// this function copies all properties and symbols, filtering out some special ones
function copyProps(target, source) {
  Object.getOwnPropertyNames(source)
    .concat(Object.getOwnPropertySymbols(source))
    .forEach((prop) => {
      if (
        !prop.match(
          /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
        )
      )
        Object.defineProperty(
          target,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)
        );
    });
}

function aggregation(baseClass, ...mixins) {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }

  // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
  mixins.forEach((mixin) => {
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
}
```

Let's define the classes with the class extension:

```javascript
class Connectable {
  connectTo(other) {
    for (let from of this)
      for (let to of other) {
        from.out.push(to);
        to.in.push(from);
      }
  }
}

class Neuron extends Connectable {
  constructor() {
    super();
    this.in = [];
    this.out = [];
  }

  toString() {
    return (
      `A neuron with ${this.in.length} inputs ` +
      `and ${this.out.length} outputs`
    );
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this,
        done: returned++,
      }),
    };
  }
}

// multiple inheritance is impossible, so...
class NeuronLayer extends aggregation(Array, Connectable) {
  constructor(count) {
    super();
    while (count-- > 0) this.push(new Neuron());
  }

  toString() {
    return `A layer with ${this.length} neurons`;
  }
}
```

Let's see the result:

```javascript
const neuron2 = new Neuron();
const layer1 = new NeuronLayer(3);
const layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(layer1);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());
```

### Summary

- Objects can use other objects via inheritance and composition.
- Some objects need identical or similar behaviors.
- It allows to create objects in an unfirme way.
- Using the `Symbol.Iterator` in JavaScript the iterator can be achieved.
- The same object can be iterable by using `this` with generators (`yield`).
