# Clases

### Consideraciones:

- Usadas para el paradigma de programación orientado a objetos.
- Define como trabaja la estructura de datos.
- No se tratan de valores concretos.

### Declaración simple de una clase

Para declarar una clase es necesario usar la palabra reservada `class`, las acciones se definen como métodos mediante funciones.

```javascript
// Clase Page
class Page {
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }
}
```

### Modularidad y Encapsulamiento

Podemos usar clases para crear relaciones y dividir en partes más pequeñas pertenencientes a la misma entidad y pertenecen al mismo nivel de abstacción.

En el método `addPage` de la clase `Notebook` usamos una instancia de la clase `Page` para cada una de las páginas en la libreta.

```javascript
// Clase Page
class Page {
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }
}

// Clase Notebook
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

// crea una instancia de la clase Notebook
const notebook = new Notebook();

// agrega nuevas páginas
notebook.addPage('It is a new page');
notebook.addPage('It is another page');

// imprime todas las páginas
notebook.printAll();
```

### Herencia y Polimorfismo

Se pueden definir clases heredando propiedades de una clase mediante una jerarquía de clasificación; lo que permite que los objetos herenden las propiedades y los métodos de la clase de la que se extiende.

Definimos la clase `Publication` que será utilizada como clase base:

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

Ahora podemos definir la clase `Book`, donde extendemos de la clase `Publication` y sobreescribir el método `print` para agregar información de impresión y usar el método print de la clase padre.

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

Adicional, se puede crear otra clase semánticamente diferente `BlogPost` pero que puede extender de la misma clase `Publication` con el mismo método.

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

Ahora podemos crear las instancias de cada una de las clases con diferente impresión.

```javascript
// crea una instancia de la clase Book
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

// crea una instancia de la clase BlogPost
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
