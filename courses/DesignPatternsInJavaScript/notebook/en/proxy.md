# Proxy

An interface to access a particular resource.

### Motivation

- Search for the same interface, completely different behavior.
- Allows communication through the so-called `communication proxy`.

### Implementation

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

Now let's see how to extend properties of a proxy:

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

Let`s see how we can make modifications to create protection on a proxy.

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

Finally, we can see how to create a virtual proxy.

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

### Summary

- A proxy has the same interface as the underliying object.
- To create a proxy, simply replicate the existing interface of an object.
- Add relevant functionality to the redefined member functions.
- Different proxies have completely different behaviors.
