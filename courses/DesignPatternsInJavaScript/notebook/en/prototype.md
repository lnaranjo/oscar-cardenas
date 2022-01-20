# Prototype

A partially or fully initiated object that you can clone and make use of.

### Motivation

- Complicated objects cannot be defined from scratch.
- An existing design (total or partial) is a prototype.
- A prototype can be cloned and customized.
- Using `factory` you can clone prototypes.

### Implementation

Let us consider the following two classes: Person and Address. Now let's see how they interact with each other.

```javascript
class Address {
  constructor(street, state, country) {
    this.street = street;
    this.state = state;
    this.country = country;
  }

  toString() {
    return `${street}, ${state}, ${country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `Hello my name is ${this.name}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, I live at ${this.address.toString()}`
    );
  }
}

const oscar = new Person(
  'Oscar',
  new Address('Prados 82C', 'Morelos', 'Mexico')
);
```

We can see that it works correctly, the problem with this is that it can have problems because it is possible to clone it importing all the references, let's see the following example:

```javascript
const oscar = new Person(
  'Oscar',
  new Address('Prados 82C', 'Morelos', 'Mexico')
);

const adriana = JSON.parse(JSON.stringify(oscar));
```

To solve this we will make a class specialized in cloning the object:

```javascript
class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    const indx = this.types.findIndex(
      (t) => t.name === object.constructor.name
    );

    if (indx !== -1) {
      object.typeIndex = indx;
    }

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        this.makeRecursive(object[key]);
      }
    }
  }

  recontructionRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      const type = this.types[object.typeIndex];
      const obj = new type();

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null) {
          obj[key] = this.recontructionRecursive(object[key]);
        }

        delete obj.typeIndex;
        return obj;
      }
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    const copy = JSON.parse(JSON.stringify(object));
    return this.recontructionRecursive(copy);
  }
}
```

Now let's use the class created to be able to clone objects with the same properties:

```javascript
const serializer = new Serializer([Person, Address]);

const adriana = serializer.clone(oscar);
```

### Summary

- Allows copy to depth.
- Allows customization of instances.
- By applying the `factory` principle we obtain a practical API to build prototypes.
