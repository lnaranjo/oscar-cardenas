# Builder

Cuando la construcción de objetos sea complicada, se puede exponer una API para crear objetos de forma optimizada.

## Motivation

- Algunos objetos son sencillos y pueden crearse con una sola llamada al iniciarse.
- Otros objetos requieren mucha ceremonia para su creación.
- Tener un objeto con "N" argumentos inicializadores no es productivo.
- En su lugar, opta por la constucción a trozos.
- Un `builder` proporciona una API para construir un objeto paso a paso.

## Consideraciones

- Un `builder` es un componente separado para construir un objeto.
- Un `builder` es usualmente representado por el ser un método estático dentro de la clase.
- Los métodos fluidos son aquellos que permiten hacer encadenamiento de métodos y solo retornan la misma instancia
- Permite que se puedan construir interfaces con difrentes constructores tomando la clase base.

## Ejemplos

### Ejemplo básico de un `builder`

Supongamos que necesitamos crear objetos de forma sencilla de una clase, para ello definamos como primer paso la clase llamada `Tag`:

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

  static get indentSize() {
    return 2;
  }
}
```

Ahora, podemos crear un método estático que nos retorna una instancia de la misma clase:

```javascript
class Tag {
  // ...
  // ...
  static create(name) {
    return new HtmlBuilder(name);
  }
}
```

Entonces, ahora podemos instancias de clase tag mediante la función `create`:

```javascript
const myTag = Tag.create('tagName');
const secondTag = Tag.create('secondTag');
```

### Métodos fluidos

Los métodos fluidos son una funciones dentro de una clase que permiten sen llamados de forma encadenada, las solución radica en retornar la misma instancia mediante `this`. Veamos la siguiente comparación entre estos dos métodos:

```javascript
class HtmlBuilder {
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
}

const builder = Tag.create('ul');
builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'baz');
```
