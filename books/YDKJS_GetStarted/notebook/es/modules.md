# Módulos

### Consideraciones

- Agrupar datos y comportamientos organizados en unidades lógicas.
- Orientado a la sintaxis de las funciones, totalmente diferente a la sintaxis de las clases.
- Existen variaciones de tipos de módulos:
  - AMD (Asynchronous Module Definition)
  - UMD (Universal Module Definition)
  - CommonJS (Classic Node.js-style modules)

### Definición de módulos

Podemos definir algunos módulos y permitir que interactuen entre si. Definimos 3 módulos diferentes: `Publication`, `Book`, `BlogPost`. Lo importante es que se puede interactuar mediante las interfaces que son usadas como una API pública.

Módulo Publication:

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

Módulo Book:

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

Módulo BlogPost:

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

En el siguiente ejemplo usamos los módulos y la forma de que se interactuan con la APIs públicas:

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
