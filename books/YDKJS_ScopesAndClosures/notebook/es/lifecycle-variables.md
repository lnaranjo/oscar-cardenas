# The (Not So) Secret Lifecycle of Variables

## Hoisting

El término más comúnmente utilizado para que una variable sea visible desde el principio de su `scope`, aunque su declaración pueda aparecer más abajo en el `scope`, se llama `hoisting`.

En lugar de que el `hoisting` sea un paso de ejecución concreto que el motor JS realiza, es más útil pensar en el `hoisting` como una visualización de varias acciones que JS realiza para configurar el programa antes de la ejecución.

```javascript
var greeting; // hoisted declaration
greeting = 'Hello!'; // the original line 1
console.log(greeting); // Hello!
greeting = 'Howdy!'; // `var` is gone!
```

El `hoisting` es un mecanismo para reordenar el código puede ser una simplificación atractiva, pero no es exacta. El motor JS no reordena realmente el código. No puede mirar mágicamente hacia adelante y encontrar las declaraciones; la única manera de encontrarlas con precisión, así como todos los límites de alcance en el programa, sería analizar completamente el código.

### Declaration vs Expression

La `Function hoisting` sólo se aplica a las declaraciones formales de funciones (específicamente las que aparecen fuera de los bloques. Dependiendo de su entorno JS, el mensaje de error diría algo así como, `undefined is not a function`, o más útil, `greeting is not a function`.

```javascript
greeting(); // TypeError

var greeting = function greeting() {
  console.log('Hello!');
};
```

### Variable Hoisting

El uso de este tipo de `hoisting` de variables probablemente resulte poco natural, y muchos lectores querrán, con razón, evitarlo en sus programas.

## Re-declaration?

¿Qué crees que ocurre cuando una variable se declara más de una vez en el mismo `scope`?

```javascript
var studentName = 'Frank';
console.log(studentName); // Frank

var studentName;
console.log(studentName); // ???
```

Si se considera este programa desde la perspectiva del `hoisting`, el código se reordenaría así a efectos de ejecución:

```javascript
var studentName;
var studentName; // clearly a pointless no-op!

studentName = 'Frank';

console.log(studentName); // Frank
console.log(studentName); // Frank
```

Se trata, por supuesto, de una opinión estilística, no de un argumento técnico. Muchos desarrolladores están de acuerdo con la posición, y probablemente es en parte por lo que TC39 incluyó el error (además de dejar conformes a `const`). Pero se podría haber argumentado razonablemente que mantener la coherencia con el precedente de var era más prudente, y que tal aplicación de la opinión era mejor dejarla en manos de herramientas opcionales como los linters.

## Uninitialized Variables (aka, TDZ)

Con las declaraciones `var`, la variable tiene `hoisting` a la parte superior de su `scope`. Pero también se inicializa automáticamente al valor indefinido, de modo que la variable puede utilizarse en todo el `scope`. Sin embargo, las declaraciones `let` y `const` no son iguales en este sentido.

```javascript
console.log(studentName); // ReferenceError

let studentName = 'Suzy';
```

El resultado de este programa es que se lanza un `ReferenceError` en la primera línea. Dependiendo de su entorno JS, el mensaje de error puede decir algo como: `Cannot access studentName before initialization`.

## Finally Initialized

Trabajar con variables tiene muchos más matices de lo que parece a primera vista. El `hoisting`, `re-declaration` y `TDZ` son fuentes comunes de confusión para los desarrolladores, especialmente para aquellos que han trabajado en otros lenguajes antes de llegar a JS.

El `hoisting` suele citarse como un mecanismo explícito del motor JS, pero en realidad es más bien una metáfora para describir las distintas formas en que JS maneja las declaraciones de variables durante la compilación.

La declaración y redeclaración de variables tiende a causar confusión cuando se piensa en ellas como operaciones en tiempo de ejecución. Pero si se pasa a pensar en tiempo de compilación para estas operaciones, las peculiaridades y sombras disminuyen.

El error `TDZ (zona muerta temporal)` es extraño y frustrante cuando se encuentra. Afortunadamente, `TDZ` es relativamente sencillo de evitar si siempre tienes cuidado de colocar las declaraciones `let/const` en la parte superior de cualquier `scope`.
