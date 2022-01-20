# Composite

### Motivación

- Nos permite crear objetos compuestos.
- Algunos objetos pueden usar propiedades y métodos de otros objetos.
- Es usado par manejo de escalares y objetos de composición uniforme.

### Implementación

Comencemos por definir la clase `GraphicObject`:

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

Ahora definamos las clases que extienden:

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

Por último tenemos las instancias de las clases anteriormente definidas.

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

Ahora veamos un ejemplo donde tenemos que crear una clase con dependencia de dos, para ello usemos la siguiente función que nos permite fusionar ambas:

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

Definamos las clases con la extensión de la misma:

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

Veamos el resultado:

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

### Resumen

- Los objetos pueden usar otros objetos mediante la via de herencia y composición.
- Algunos objetos necesitan identicos o similares comportamientos.
- Permite crear objetos de forma unfirme.
- Mediante el `Symbol.Iterator` en JavaScript se puede lograr la iterator.
- Un mismo objeto puede ser iterable mediante el uso de `this` con generators (`yield`).
