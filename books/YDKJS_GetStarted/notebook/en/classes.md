# Classes

### Considerations:

- Used like a object oriented paradigm.
- Define how such a data structure works.
- Don't themselves concrete values.

### Simple declaration of a class

To declare a class it is necessary to use the reserved word `class`, actions are defined as methods by means of functions.

```javascript
// Class Page
class Page {
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }
}
```

### Modularity & Encapsulation

We can use classes to create relationships and divide into smaller parts belonging to the same entity and belonging to the same level of absorption.

In the `addPage` method of the `Notebook` class we use an instance of the `Page` class for each of the pages in the notebook.

```javascript
// Class Page
class Page {
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }
}

// Class Notebook
class Notebook {
  constructor() {
    this.pages = [];
  }

  addPage(text) {
    const page = new Page(text);
    this.pages.push(page);
  }

  printAll() {
    for (let page of this.pages) {
      page.print();
    }
  }
}

// creates an instance of the class Notebook
const notebook = new Notebook();

// add new pages
notebook.addPage('It is a new page');
notebook.addPage('It is another page');

// prints all pages
notebook.printAll();
```

### Inheritance & Polymorphism

Classes can be defined by inheriting properties from a class through a classification hierarchy; this allows objects to inherit the properties and methods of the class from which it is extended.

We define the `Publication` class that will be used as the base class:

```javascript
class Publication {
  constructor(title, author, pubDate) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
  }

  print() {
    console.log(`
        Title: ${this.title}
        By: ${this.author}
        Published: ${this.pubDate}
    `);
  }
}
```

Now we can define the `Book` class, where we extend the `Publication` class and override the `print` method to add printing information and use the print method of the parent class.

```javascript
// Class Book
class Book extends Publication {
  constructor(bookDetails) {
    super(bookDetails.title, bookDetails.author, bookDetails.publishedOn);
    this.publisher = bookDetails.publisher;
    this.ISBN = bookDetails.ISBN;
  }

  print() {
    super.print();
    console.log(`
        Publisher: ${this.publisher}
        ISBN: ${this.ISBN}
    `);
  }
}
```

Additionally, you can create another semantically different class `BlogPost` but which can extend the same `Publication` class with the same method.

```javascript
// Class BlogPost
class BlogPost extends Publication {
  constructor(title, author, pubDate, url) {
    super(title, author, pubDate);
    this.url = url;
  }

  print() {
    super.print();
    console.log(this.url);
  }
}
```

Now we can create instances of each of the classes with different printing.

```javascript
// creates an instance of the class Book
const YDKJS = new Book({
  title: "You Don't Know JS",
  publishedOn: 'June 2014',
  author: 'Kyle Simpson',
  publisher: "O'Reilly",
  ISBN: '123456-789',
});

YDKJS.print();
/*
Title: You Don't Know JS
By: Kyle Simpson
Published: June 2014
Publiser: O'Reilly
ISBN: 123456-789
*/

// creates an instance of the class BlogPost
var forAgainstLet = new BlogPost(
  'For and against let',
  'Kyle Simpson',
  'October 27, 2014',
  'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet.print();
/*
Title: For and against let
By: Kyle Simpson
Published: October 27, 2014
*/
```
