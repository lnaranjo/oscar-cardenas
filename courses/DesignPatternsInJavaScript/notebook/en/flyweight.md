# Flyweight

A space optimization technique that uses little memory by storing associated information in similar objects.

### Motivation

- Avoids redundancy when storing data.
- Operate using ranges, conversions or transformations.
- Saving lists of entries over and over again.

### Implementation

Let's start with an example of text formatting:

```javascript
class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).map(() => false));
  }

  capitalize(start, end) {
    for (let i = start; i <= end; ++i) this.caps[i] = true;
  }

  toString() {
    let buffer = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }

    return buffer.join('');
  }
}
```

We now write an improved version:

```javascript
class TextRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.capitalize = false;
    // other formatting options here
  }

  covers(position) {
    return position >= this.start && position <= this.end;
  }
}

class BetterFormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.formatting = [];
  }

  getRange(start, end) {
    let range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    let buffer = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      for (let range of this.formatting) {
        if (range.covers(i) && range.capitalize) c = c.toUpperCase();
      }
      buffer.push(c);
    }
    return buffer.join('');
  }
}
```

We can notice the difference here:

```javascript
const text = 'This is a brave new world';
let ft = new FormattedText(text);
ft.capitalize(10, 15);
console.log(ft.toString());

let bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalize = true;
console.log(bft.toString());
```

### Summary

- It allows to store common information externally.
- Specifies by indexes or references the external information.
- It defines the idea of ranges in a homogeneous collection and stores information related to the ranges.
