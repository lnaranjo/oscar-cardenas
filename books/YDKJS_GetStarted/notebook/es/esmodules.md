# ES Modules

### Consideraciones:

- No existe una función que la encapsula para definir un módulo.
- Interactúa con otras APIs usando la sentencia `export`.
- Para utilizar el módulo sólo necesita importar y no utilizar una instancia.

### Definición simple de un módulo

Podemos definir un módulo con funciones complementarias y solo exportar la función principal para un módulo.

Definamos el módulo `publication.js` que exporta una función para crear una publicación:

```javascript
function printDetails(title, author, pubDate) {
  console.log(`
      Title: ${title}
      Author: ${author}
      Published: ${pubDate}
    `);
}

export function create(title, author, pubDate) {
  return {
    print() {
      printDetails(title, author, pubDate);
    },
  };
}
```

Para poder usar la funcion `create` definida en el módulo `publication.js` en otro módulo sólo se importa, incluso es posible renombrarlo.

Definimos el módulo blogpost.js donde se importa la función `create` para extender la funcionalidad del módulo, veamos el ejemplo:

```javascript
import { create as createPub } from 'publication';

function printDetails(pub, url) {
  pub.print();
  console.log(url);
}

export function create(title, author, pubDate, url) {
  const pub = createPub(title, author, pubDate);

  return {
    print() {
      printDetails(pub, url);
    },
  };
}
```

Ahora podemos extender la función en el flujo principal de un programa, importando del módulo `blogpost` la función `create`:

```javascript
import { create as newBlogPost } from 'blogpost.js';

const forAgainstLet = newBlogPost(
  'For and against let',
  'Kyle Simpson',
  'October 27, 2014',
  'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet.print();
```
