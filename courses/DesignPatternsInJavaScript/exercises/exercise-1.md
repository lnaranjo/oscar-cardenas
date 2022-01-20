# Exercise 1

### Objective

You are asked to implement the Builder design pattern for rendering simple chunks of code.

Sample use of the builder you are asked to create:

```javascript
let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());
```

The expected output of the above code is:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

Please observe the same placement of spaces and indentation.

### Solution

```javascript
class Field {
  constructor(name) {
    this.name = name;
  }
}

class Class {
  constructor(name) {
    this.name = name;
    this.fields = [];
  }

  toString() {
    let classOutput = [];
    classOutput.push(`class ${this.name} {\n`);

    if (this.fields.length) {
      classOutput.push(`  constructor(`);

      for (let i = 0; i < this.fields.length; ++i) {
        classOutput.push(this.fields[i].name);
        if (i + 1 !== this.fields.length) classOutput.push(', ');
      }

      classOutput.push(`) {\n`);

      for (let field of this.fields) {
        classOutput.push(`    this.${field.name} = ${field.name};\n`);
      }

      classOutput.push('  }\n');
    }

    classOutput.push('}');
    return classOutput.join('');
  }
}

class CodeBuilder {
  constructor(className) {
    this.class = new Class(className);
  }

  addField(name) {
    this.class.fields.push(new Field(name));
    return this;
  }

  toString() {
    return this.class.toString();
  }
}
```
