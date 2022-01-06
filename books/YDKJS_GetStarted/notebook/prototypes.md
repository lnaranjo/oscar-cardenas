# Prototypes

## Considerations

- The keyword `this` is the characteristic of an object, and specifically resolution of a property access.
- Is like a linkage hidden between two objects when the object is created.

## Examples

```javascript
const homework = {
  topic: "JS",
};

const otherHomework = Object.create(homework);

console.log(otherHomework.topic); // 'JS'

otherHomework.topic = "Math";

console.log(homework.topic); // 'JS'
console.log(otherHomework.topic); // 'Math'

// using `this` to linkage
const newHomework = {
  study() {
    console.log(`Please study ${this.topic}`);
  },
};

const jsHw = Object.create(newHomework);
jsHw.topic = "JS";
jsHw.study(); // Please study JS

const mathHw = Object.create(newHomework);
mathHw.topic = "Math";
mathHw.study(); // Please study Math

// using function prototype declaration
function classroom() {}
classroom.prototype.welcome = function hello() {
  console.log("¡Welcome, students!");
};
classroom.welcome(); // ¡Welcome, students!
```
