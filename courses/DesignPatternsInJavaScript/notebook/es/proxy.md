# Proxy

Una interface para acceder a un recurso en particular.

### Motivación

- Buscar una misma interfaz, un comportamiento completamente diferente.
- Permite la comunicación mediante la llamada `communication proxy`.

### Implementación

```javascript
class Percentage {
  constructor(percent) {
    this.percent = percent; // 0 to 100
  }

  toString() {
    return `${this.percent}%`;
  }

  valueOf() {
    return this.percent / 100;
  }
}

let fivePercent = new Percentage(5);
console.log(`${fivePercent} of 50 is ${50 * fivePercent}`);
```

Ahora veamos como extender propiedades de un proxy:

```javascript
class Property {
  constructor(value, name = '') {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this._value === newValue) return;
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10, 'agility');
  }

  get agility() {
    return this._agility.value;
  }
  set agility(value) {
    this._agility.value = value;
  }
}

let c = new Creature();
c.agility = 12;
c.agility = 13;
```

Veamos como podemos hacer modificaciones para crear protección en un proxy.

```javascript
class Car {
  drive() {
    console.log('Car being driven');
  }
}

class CarProxy {
  constructor(driver) {
    this.driver = driver;
    this._car = new Car();
  }

  drive() {
    if (this.driver.age >= 16) this._car.drive();
    else console.log('Driver too young');
  }
}

class Driver {
  constructor(age) {
    this.age = age;
  }
}

let car = new Car();
car.drive();

let car2 = new CarProxy(new Driver(12)); // try 22
car2.drive();
```

Por último, podemos ver como crear un proxy virtual.

```javascript
class Image {
  constructor(url) {
    this.url = url;
    console.log(`Loading image from ${this.url}`);
  }

  draw() {
    console.log(`Drawing image ${this.url}`);
  }
}

class LazyImage {
  constructor(url) {
    this.url = url;
  }

  draw() {
    if (!this.image) this.image = new Image(this.url);
    this.image.draw();
  }
}

function drawImage(img) {
  console.log('About to draw the image');
  img.draw();
  console.log('Done drawing the image');
}

let img = new LazyImage('http://pokemon.com/pikachu.png');
drawImage(img);
```

### Resumen

- Un proxy tiene la misma interfaz que el objeto subyacente.
- Para crear un proxy, basta con replicar la interfaz existente de un objeto.
- Añada la funcionalidad pertinente a las funciones miembro redefinidas.
- Los diferentes proxies tienen comportamientos completamente diferentes.
