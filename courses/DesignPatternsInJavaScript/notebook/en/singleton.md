# Singleton

A component that is instantiated only once.

### Motivation

- Some components is the only principle that makes sense, (databases, object factory).
- The call to the constructor can be expensive.
- It is necessary to foresee that anyone can create an object.

### Implementation

We see how to implement the `Singleton` principle:

```javascript
class Singleton {
  constructor() {
    const instance = this.constructor.instance;

    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }
}

const s1 = new Singleton(); // original
const s2 = new Singleton(); // same instance of s1 const
```

### Monostate

On the subject of `monostate` refers us about keeping the last state, let's see the following example:

```javascript
class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }
  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }
  set age(value) {
    ChiefExecutiveOfficer._age = value;
  }

  toString() {
    return `CEO's name is ${this.name} ` + `and he is ${this.age} years old.`;
  }
}
ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

const ceo = new ChiefExecutiveOfficer();
ceo.name = 'Adam Smith';
ceo.age = 55;

const ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'John Gold';
ceo2.age = 66;

console.log(ceo.toString()); // Jonh Gold and he is 66 years old.
console.log(ceo2.toString()); // Jonh Gold and he is 66 years old.
```

### Summary

- The constructor chooses what to return, we can return the same instance.
- With `monostate` we have many instances with shared information.
- Depending on `Singleton` is a bad idea, instead we can have a dependency.
