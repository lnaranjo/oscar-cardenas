# SOLID Design Principles

- Single Responsibility
- Open-Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

## Single Responsibility Principle

Este principio te dice que una clase debe tener una única responsabilidad primaria y, como consecuencia, sólo debe tener una razón de cambio que esté relacionada de alguna manera con su responsabilidad.

Supongamos que necesitamos crear una clase que permita añadir entradas a un diario y que las entradas se almacenen en un archivo txt; el siguiente ejemplo muestra una propuesta de cómo hacerlo.

Definimos 2 clases para realizar las dos operaciones, `Journal` mantiene los entriues del diario y el `PersistenceManager` para almacenar el diario, por lo que quedaría así:

Definimos la clase Journal que será quién determine como será el tratamiento de la información:

```javascript
class Journal {
  constructor() {
    this.entries = [];
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }
}
```

Ahora definimos la clase `PersistenceManager` que tiene como objetivo crear un nuevo archivo con todas las entradas definidas en una instancia de `Journal`.

```javascript
const fs = require('fs');

class PersistenceManager {
  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}
```

Ahora podemos crear una instancia de la clase `Journal` y poder agregar entradas; posteriormente podemos crear un nuevo archivo mediante una instancia de `PersistenceManager`.

```javascript
Journal.count = 0;

let j = new Journal();
const pm = new PersistenceManager();

j.addEntry('Hello world');
j.addEntry('Second Entry');

pm.saveToFile(j, '/temp/first-journal.txt');
```

## Open-Closed Principle

Este principio exige que las entidades puedan ser ampliamente adaptadas pero que también permanezcan inalteradas. Esto nos lleva a crear entidades duplicadas con un comportamiento especializado a través del polimorfismo. Revisa los siguientes ejemplos de implementación para aclarar este principio:

```javascript
let Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue',
});

let Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
  yuge: 'yuge',
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }

  // state space explosion
  // 3 criteria (+weight) = 7 methods

  // OCP = open for extension, closed for modification
}

const apple = new Product('Apple', Color.green, Size.small);
const tree = new Product('Tree', Color.green, Size.large);
const house = new Product('House', Color.blue, Size.large);

const products = [apple, tree, house];
const pf = new ProductFilter();

console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green))
  console.log(` * ${p.name} is green`);
```

Siguiendo este principio, las clases están abiertas a la ampliación y cerradas a la modificación; la implementación es así:

```javascript
// general interface for a specification
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class BetterFilter {
  filter(items, spec) {
    return items.filter(spec.isSatisfied);
  }
}

// specification combinator
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

const bf = new BetterFilter();

console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log(`Large products:`);
for (let p of bf.filter(products, new SizeSpecification(Size.large))) {
  console.log(` * ${p.name} is large`);
}

const spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);
console.log(`Large and green products:`);
for (let p of bf.filter(products, spec))
  console.log(` * ${p.name} is large and green`);
```

## Liskov Substitution Principle

Esencialmente este principio habla del principio de riesgo de sustitución, por ejemplo una función que toma una clase base, debe ser capaz de tomar un derivado en otra clase como sin romper la funcionalidad de ninguna manera.

En esta implementación se describe cómo funciona este principio:

```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  toString() {
    return `${this._width}×${this._height}`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = this._height = value;
  }

  set height(value) {
    this._width = this._height = value;
  }
}

function useIt(rc) {
  let width = rc._width;
  rc.height = 10;
  console.log(`Expected area of ${10 * width}, ` + `got ${rc.area}`);
}

const rc = new Rectangle(2, 3);
useIt(rc);

const sq = new Square(5);
useIt(sq);
```

## Interface Segregation Principle

Este principio en js no funciona en absoluto, porque en JS no hay interfaces, realmente se refiere a algo discutible en el sentido de que su enfoque para formalizar algún tipo de clases basadas en la abstracción donde se formaliza la interfaz.

Ciertamente te da algunos beneficios, especialmente, ya sabes, si tienes clientes que se espera que proporcionen un tipo particular en una API, puedes formalizarlo de esta manera y compartirlo.

```javascript
var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
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
  };
  mixins.forEach((mixin) => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

class Document {}

class Machine {
  constructor() {
    if (this.constructor.name === 'Machine')
      throw new Error('Machine is abstract!');
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    //
  }

  fax(doc) {
    //
  }

  scan(doc) {
    //
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    let msg = `${name} is not implemented!`;
    super(msg);
    // maintain proper stack trace
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, NotImplementedError);
    // your custom stuff here :)
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // ok
  }

  // omitting this is the same as no-op impl

  // fax(doc) {
  //   // do nothing
  // }

  scan(doc) {
    // throw new Error('not implemented!');
    throw new NotImplementedError('OldFashionedPrinter.scan');
  }
}

// solution
class Printer {
  constructor() {
    if (this.constructor.name === 'Printer')
      throw new Error('Printer is abstract!');
  }

  print() {}
}

class Scanner {
  constructor() {
    if (this.constructor.name === 'Scanner')
      throw new Error('Scanner is abstract!');
  }

  scan() {}
}

class Photocopier extends aggregation(Printer, Scanner) {
  print() {
    // IDE won't help you here
  }

  scan() {
    //
  }
}

// we don't allow this!
// const machine = new Machine();

const printer = new OldFashionedPrinter();
printer.fax(); // nothing happens
printer.scan();
```

## Dependency Inversion Principle

El principio de inversión de la dependencia establece básicamente que los módulos de alto nivel no deben depender directamente de los módulos de bajo nivel, como las relaciones, sino que deben depender de las abstracciones.

```javascript
let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// low-level (storage)
class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === 'RelationshipBrowser')
      throw new Error('RelationshipBrowser is abstract!');
  }

  findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
    this.data.push({
      from: child,
      type: Relationship.child,
      to: parent,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter((r) => r.from.name === name && r.type === Relationship.parent)
      .map((r) => r.to);
  }
}

// high-level (research)
class Research {
  constructor(browser) {
    for (let p of browser.findAllChildrenOf('John')) {
      console.log(`John has a child named ${p.name}`);
    }
  }
}

const parent = new Person('John');
const child1 = new Person('Chris');
const child2 = new Person('Matt');

// low-level module
const rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
```
