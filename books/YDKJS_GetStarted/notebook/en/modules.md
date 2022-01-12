# Modules

### Considerations

- Group data and behavior organized in logical units.
- Function syntax oriented, entirely differente to class syntax.
- There are variations of module types:
  - AMD (Asynchronous Module Definition)
  - UMD (Universal Module Definition)
  - CommonJS (Classic Node.js-style modules)

### Module definition

We can define some modules and allow them to interact with each other. We define 3 different modules: `Publication`, `Book`, `BlogPost`. The important thing is that you can interact through the interfaces that are used as a public API.

Module Publication:

```javascript
function Publication(title, author, pubDate) {
  var publicAPI = {
    print() {
      console.log(`
        Title: ${title}
        By: ${author}
        Published: ${pubDate}
      `);
    },
  };

  return publicAPI;
}
```

Module Book:

```javascript
function Book(bookDetails) {
  var pub = Publication(
    bookDetails.title,
    bookDetails.author,
    bookDetails.publishedOn
  );

  var publicAPI = {
    print() {
      pub.print();

      console.log(`
        Publisher: ${bookDetails.publisher}
        ISBN: ${bookDetails.ISBN}
      `);
    },
  };

  return publicAPI;
}
```

Module BlogPost:

```javascript
function BlogPost(title, author, pubDate, url) {
  var pub = Publication(title, author, pubDate);

  var publicAPI = {
    print() {
      pub.print();
      console.log(url);
    },
  };

  return publicAPI;
}
```

In the following example we use the modules and the way they interact with the public APIs:

```javascript
// instance a new book
const YDKJS = Book({
  title: "You Don't Know JS",
  publishedOn: 'June 2014',
  author: 'Kyle Simpson',
  publisher: "O'Reilly",
  ISBN: '123456-789',
});

YDKJS.print();

// instance a new blogpost
var forAgainstLet = BlogPost(
  'For and against let',
  'Kyle Simpson',
  'October 27, 2014',
  'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet.print();
```
