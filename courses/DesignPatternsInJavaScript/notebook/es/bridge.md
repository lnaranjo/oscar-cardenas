# Bridge

Un mecanismo que desacopla una interfaz heredada para hacer una implementación.

### Motivación

- Previene un producto con explosión cartesiana.
- Evita la explosión de entidades.

### Implementación

Consideremos la clase `Shape` como la clase base donde extenderemos las demás:

```javascript
class Shape {
  constructor(renderer, name = null) {
    this.renderer = renderer;
    this.name = name;
  }

  toString() {
    return `Drawing ${this.name} as ${this.renderer.whatToRenderAs}`;
  }
}
```

Ahora implementemos las clases que extienden de la clase `Shape`:

```javascript
class Triangle extends Shape {
  constructor(renderer) {
    super(renderer, 'triangle');
  }
}

class Square extends Shape {
  constructor(renderer) {
    super(renderer, 'square');
  }
}
```

Ahora definamos las clases con tipos de render:

```javascript
class RasterRenderer {
  get whatToRenderAs() {
    return 'pixels';
  }
}

class VectorRenderer {
  get whatToRenderAs() {
    return 'lines';
  }
}
```

Por último hagamos pruebas para verificar el comportamiento de las mismas:

```javascript
describe('facade', function () {
  it('render vector square', function () {
    let sq = new Square(new VectorRenderer());
    expect(sq.toString()).toEqual('Drawing square as lines');
  });

  it('render raster triangle', function () {
    let sq = new Triangle(new RasterRenderer());
    expect(sq.toString()).toEqual('Drawing triangle as pixels');
  });
});
```

### Resumen

- Desacoplamiento de la abstacción para implementación.
- En ambos casos existe herencia.
- Una forma de encapsulación fuerte.
