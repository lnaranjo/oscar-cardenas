# Classes

## Considerations:

- Used like a object oriented paradigm.
- Define how such a data structure works.
- Don't themselves concrete values.

## Examples:

```javascript
/**
 * Classes
 */

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

// instance class notebook
const notebook = new Notebook();
// insert new pages inside notebook
notebook.addPage("It is a new page");
notebook.addPage("It is another page");
// print all pages inside notebook
notebook.printAll();

/**
 * Inheritance
 */

// Class Publication
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

// instance a new book
const YDKJS = new Book({
  title: "You Don't Know JS",
  publishedOn: "June 2014",
  author: "Kyle Simpson",
  publisher: "O'Reilly",
  ISBN: "123456-789",
});

YDKJS.print();
/*
Title: You Don't Know JS
By: Kyle Simpson
Published: June 2014
Publiser: O'Reilly
ISBN: 123456-789
*/

// instance a new blogpost
var forAgainstLet = new BlogPost(
  "For and against let",
  "Kyle Simpson",
  "October 27, 2014",
  "https://davidwalsh.name/for-and-against-let"
);

forAgainstLet.print();
/*
Title: For and against let
By: Kyle Simpson
Published: October 27, 2014
*/
```
