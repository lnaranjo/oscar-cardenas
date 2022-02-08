# Limiting Scope Exposure

## Least Exposure

La ingeniería del software articula una disciplina fundamental, que suele aplicarse a la seguridad del software, denominada "Principio del mínimo privilegio" (POLP en Inglés), y una variación de este principio que se aplica a nuestro debate actual suele denominarse "mínima exposición" (POLE en Inglés).

POLP expresa una postura defensiva para la arquitectura del software: los componentes del sistema deben ser diseñados para funcionar con el menor privilegio, el menor acceso y la menor exposición.

Cuando las variables utilizadas por una parte del programa están expuestas a otra parte del programa, a través del alcance, hay tres peligros principales que suelen surgir:

- **Colisión de nombres**: si utilizas un nombre de variable/función común y útil en dos partes diferentes del programa, pero el identificador proviene de un `scope` compartido (como el `scope` global), entonces se produce una colisión de nombres, y es muy probable que se produzcan fallos ya que una parte utiliza la variable/función de una manera que la otra parte no espera.

- **Comportamiento inesperado**: si expones variables/funciones cuyo uso es privado para una parte del programa, permite que otros desarrolladores las usen de forma no prevista, lo que puede violar el comportamiento esperado y causar bugs.

- **Dependencia no intencionada**: si expones variables/funciones innecesariamente, invitas a otros desarrolladores a usar y depender de esas piezas que de otro modo serían privadas. Aunque esto no rompe tu programa hoy, crea un peligro de refactorización en el futuro, porque ahora no puedes refactorizar fácilmente esa variable o función sin romper potencialmente otras partes del software que no controlas.

## Hiding in Plain (Function) Scope

Ahora debería estar claro por qué es importante ocultar nuestras declaraciones de variables y funciones en los `scopes` más bajos (más profundamente anidados) posibles. ¿Pero cómo lo hacemos? Ya hemos visto las palabras clave `let` y `const`, que son declaradores de `scope` de bloque. Eso puede hacerse fácilmente envolviendo un `scope` de función alrededor de una declaración.

```javascript
var cache = {};
function factorial(x) {
  if (x < 2) return 1;
  if (!(x in cache)) {
    cache[x] = x * factorial(x - 1);
  }
  return cache[x];
}

factorial(6); // 720
cache;
// {
// "2": 2,
// "3": 6,
// "4": 24,
// "5": 120,
// "6": 720
// }
factorial(7); // 5040
```

Ahora veamos cuando intencionalemte ocualtamos el cache:

```javascript
// outer/global scope
function hideTheCache() {
  // "middle scope", where we hide `cache`
  var cache = {};
  return factorial;
  // **********************
  function factorial(x) {
    // inner scope
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }
    return cache[x];
  }
}

var factorial = hideTheCache();
factorial(6); // 720
factorial(7); // 5040
```

## Scoping with Blocks

En general, cualquier par de llaves `{}` que sea una declaración actuará como un `block`, pero no necesariamente como un `scope`. Un `block` sólo se convierte en un `scope` si es necesario, para contener sus declaraciones con `block scope`.

```javascript
{
  // not necessarily a scope (yet)
  // ..
  // now we know the block needs to be a scope
  let thisIsNowAScope = true;
  for (let i = 0; i < 5; i++) {
    // this is also
    if (i % 2 == 0) {
      // this is just a block, not a scope
      console.log(i);
    }
  }
}
// 0 2 4
```

Un `scope` de bloque explícito puede ser útil incluso dentro de otro bloque (tanto si el bloque exterior es un `scope` como si no):

```javascript
if (somethingHappened) {
  // this is a block, but not a scope
  {
    // this is both a block and an
    // explicit scope
    let msg = somethingHappened.message();
    notifyOthers(msg);
  }
  // ..
  recoverFromSomething();
}
```

## Function Declarations in Blocks (FiB)

Las funciones declaradas en bloques `FiB` son una particularidad de JS, ya que se comportan algo similar a lo que pasaría usando `var` para las variables.

La especificación de JS dice que las declaraciones de funciones dentro de los `block` están `block-scoped`, por lo que la respuesta es `ReferenceError`. Sin embargo, en la mayoría de los motores JS basados en navegadores (incluyendo v8, que viene de Chrome pero también se usa en Node), la respuesta es `TypeError`, lo que significa que el identificador está `scoped` fuera del `block`, pero el valor de la función no se inicializa automáticamente, por lo que permanece `undefined`.

## Blocked Over

El objetivo de las reglas de `lexical scoping` en un lenguaje de programación es que podamos organizar adecuadamente las variables de nuestro programa, tanto para fines operativos como de comunicación semántica del código. Y una de las técnicas de organización más importantes es asegurar que ninguna variable esté sobreexpuesta a `scopes` innecesarios (POLE).
