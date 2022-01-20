# Exercise 10

### Objective

Flyweight Coding Exercise
You are given a class called Sentence , which takes a string such as 'hello world'. You need to provide a method at(index) such that the method returns a flyweight that can be used to capitalize a particular word in the sentence.

Typical use would be something like:

```javascript
let s = new Sentence('alpha beta gamma');
s.at(1).capitalize = true;
console.log(s.toString()); // alpha BETA gamma
```

### Solution

```javascript
class Capitalize {
  constructor(capitalize = false) {
    this.capitalize = capitalize;
  }
}

class Sentence {
  constructor(plainText) {
    this.plainText = plainText.split(' ');
    this.location = {};
    this.index;
  }

  at(index) {
    let test = new Capitalize();
    this.location[index] = test;
    this.index = index;
    return this.location[index];
  }

  toString() {
    if (this.location[this.index] && this.location[this.index].capitalize) {
      this.plainText[this.index] = this.plainText[this.index].toUpperCase();
    }
    return this.plainText.join(' ');
  }
}
```
