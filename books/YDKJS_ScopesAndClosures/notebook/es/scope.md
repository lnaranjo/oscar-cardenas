# ¿Qué es el scope?

## Compilado vs Interpretado

La compilación de código es un conjunto de pasos que procesan el texto de su código y lo convierten en una lista de instrucciones que el ordenador puede entender. Normalmente, todo el código fuente se transforma de una vez, y las instrucciones resultantes se guardan como salida (normalmente en un archivo) que puede ser ejecutado posteriormente.

La interpretación realiza una tarea similar a la compilación, ya que transforma su programa en instrucciones comprensibles para la máquina instrucciones comprensibles para la máquina. Pero el modelo de procesamiento es diferente. A diferencia de un programa programa que se compila de una vez, con la interpretación el código fuente se transforma línea por línea; cada línea o declaración se ejecuta antes de proceder inmediatamente a procesar la siguiente línea del código fuente.

## Compilando código

- `Tokenización/Lexificación`: dividir una cadena de caracteres en trozos significativos (para la lengua), llamados tokens.

- `Parsing`: tomar un flujo (matriz) de tokens y convertirlo convertirlo en un árbol de elementos anidados, que en conjunto representan la estructura gramatical del programa.

- `Code Generation`: tomar un AST y convertirlo en código ejecutable. Esta parte varía mucho en función del lenguaje, la plataforma a la que se dirige y otros factores.

### Early Errors

```javascript
console.log('Howdy');
saySomething('Hello', 'Hi');

// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context
function saySomething(greeting, greeting) {
  'use strict';
  console.log(greeting);
}
```

### Hoisting

```javascript
function saySomething() {
  var greeting = 'Hello';
  {
    greeting = 'Howdy'; // error comes from here
    let greeting = 'Hi';
    console.log(greeting);
  }
}
saySomething();
// ReferenceError: Cannot access 'greeting' before
// initialization
```

## Compilación de variables

¿Cómo el motor JS identifica las variables y determina los ámbitos de un programa mientras se compila.

Mediante el uso de `targets` y `sources` es posible saber que es una asignación y una referencia a un target. Un target normalmente es facil identificar cuando ocurre un procedimiento en el momento de compilación.

## Modificaciones en el Scope de ejecución

Exiten dos técnicas para modificar un programa durante el tiempo de ejecución, las cuales NO DEBERÍAN USARSE, ya que son confusas y peligrosas. Aunque es importante conocerlas para cuando se encuentren en algún futuro: `eval` y `with`.

La función `eval(..)` recibe una cadena de código para compilar y ejecutar sobre la marcha durante el tiempo de ejecución del programa. Si esa cadena de código tiene una declaración de var o de función en ella, esas declaraciones modificarán el ámbito actual.

The `with(..)` essentially dynamically turns an object into a local scope—its properties are treated as identifiers in that new scope’s block.

## Lexical Scope

El léxico se asocia con la etapa de compilación. El `lexical scope` es que está controlado completamente por la colocación de funciones, bloques y declaraciones de variables, en relación entre sí.
