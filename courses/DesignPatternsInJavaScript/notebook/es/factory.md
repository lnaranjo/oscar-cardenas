# Factory

Un `factory` es un componente que se encarga únicamente de la creación masiva de objetos, de forma diferente de la creación por partes.

### Motivación

- La creación de objetos tiende a ser complicada.
- Los inicializadores no son descriptivos.
- No se pueden sobreescribir los inicializadores.
- Se tiende a recibir muchos parámetros, complicando la lectura.
- La creación masiva de objetos puede ser mediante:
  - Un método estático designado.
  - Una clase separada con múltiples inicializadores.
  - Se puede crear herencia de fabricas con una clase abstacta.

### Implementación

Consideremos el siguiente escenario al crear una clase llamada `Point`, donde originalmente definimos dos constructores:

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  constructor(rho, theta) {
    this.x = rho * Math.cos(theta);
    this.y = theta * Math.sin(theta);
  }
}
```

Claramente el ejemplo anterior no es válido en Javascript, ya que solo se permite tener un constructor por clase.

Ahora resolvamos usando el principio, de tal forma que quedaría así:

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get factory() {
    return new PointFactory();
  }
}

class PointFactory {
  newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const catisianPoint = Point.factory.newCartesianPoint(5, 10);
const polarPoint = Point.factory.newPolarPoint(5, Math.PI / 2);
```

### Resumen

- El objetivo de `factory` es crear objetos mediante métodos.
- Permite tomar ciudado en la creación de objetos.
- Puede crear objetos de forma interna (métodos estáticos) o de forma externa (herencia en las clases).
- Permite crear objetos relacionados mediante el uso de métodos.
