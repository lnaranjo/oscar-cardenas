# Factory

A `factory` is a component that deals only with the mass creation of objects, as opposed to the creation by parts.

### Motivation

- Object creation tends to be complicated.
- Initializers are not descriptive.
- Initializers cannot be overwritten.
- It tends to receive many parameters, complicating the reading.
- Mass creation of objects can be by means of:
  - A designated static method.
  - A separate class with multiple initializers.
  - Factory inheritance can be created with an abstract class.

### Implementation

Consider the following scenario when creating a class called `Point`, where we originally defined two constructors:

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

Clearly the above example is not valid in JavaScript, as it is only allowed to have one constructor per class.

Now let us solve using the principle, so that it would look like this:

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

### Summary

- The purpose of `factory` is to create objects using methods.
- It allows to take care in the creation of objects.
- It can create objects internally (static methods) or externally (inheritance in classes).
- It allows to create related objects through the use of methods.
