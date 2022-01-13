# Prototypes

### Considerations

- The keyword `this` is the characteristic of an object and specifically resolution of a property access.
- Is like a linkage hidden between two objects when the object is created.
- Prototypes allow adding new functionalities or properties by default and allow performing operations between them.

### Different ways to create prototypes

Let us assume the definition of an object:

```javascript
const homework = {
  topic: 'JS',
};
```

Now we can create a new object, using the `Object.create` function, which allows us to initialize it with the properties and values of the previous object:

```javascript
const otherHomework = Object.create(homework);
console.log(otherHomework.topic); // 'JS'
```

In the case of changing the value of the `topic` property, the value of the original object is maintained:

```javascript
otherHomework.topic = 'Math';

console.log(homework.topic); // 'JS'
console.log(otherHomework.topic); // 'Math'
```

One of the advantages of using prototypes is the ability to overwrite properties or methods, let's review the following example:

```javascript
const newHomework = {
  study() {
    console.log(`Please study ${this.topic}`);
  },
};

const jsHw = Object.create(newHomework);
jsHw.topic = 'JS';
jsHw.study(); // Please study JS

const mathHw = Object.create(newHomework);
mathHw.topic = 'Math';
mathHw.study(); // Please study Math
```
