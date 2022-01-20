# Decorator

Facilita agregar comportamientos a objetos individuales sin la necesidad de heredar.

### Motivación

- Agregar funcionaliad a los objetos.
- No se requiere alterar o re-escribir funcionalidad a código existente.
- Se quiere mantener la funcionalidad nueva por separado.
- Se necesita ser capaz de interactuar con estructuras existentes.

### Implementación

Comenzemos por definir 3 clases:

```javascript
class Shape {}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class Square extends Shape {
  constructor(side = 0) {
    super();
    this.side = side;
  }

  toString() {
    return `A square with side ${this.side}`;
  }
}
```

Para poder agregar una propiedad, podríamos definir las siguientes clases:

```javascript
// we don't want ColoredSquare, ColoredCircle, etc.
class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} ` + `has the color ${this.color}`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString() {
    return (
      `${this.shape.toString()} has ` +
      `${this.transparency * 100.0}% transparency`
    );
  }
}
```

Implementando la solución mediante instancias de objetos:

```javascript
const circle = new Circle(2);
console.log(circle.toString());

const redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());

const redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());
```

### Resumen

- Un decorador mantiene la referencia de los objetos decorados.
- Mediante campos y métodos para aumentar las capacidades de los objetos.
- Puede o no mandar las llamadas al objeto base.
