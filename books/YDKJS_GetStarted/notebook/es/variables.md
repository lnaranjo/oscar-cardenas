# Variables

Existen tres tipos para declarar varables, `var, let, const`. En esta parte, se explicarán los casos que se utilizan.

### Consideraciones

- `var` se utiliza más frecuentemente en un ámbito global, este ámbito está relacionado con `Window` (en el navegador) o `Globals` (en nodejs). El valor puede ser cambiado en el tiempo de ejecución para el código, se utiliza para los navegadores antiguos y genera mayor retrocompatibilidad.

- `let` se utiliza frecuentemente para definir variables con un ámbito específico, proporciona mutabilidad en el tiempo de ejecución y prevención a las redeclaraciones. Los casos más populares son, por ejemplo, en un bucle for, sentencias while, etc.

- `const` este tipo de declaración proporciona inmutabilidad en el tiempo de ejecución, redeclaración y reasignación de diferentes tipos de valores primitivos. Es preferible cuando el código es explícito y da contexto sobre el uso de los datos. También es una opción recomendable para declarar funciones nombradas.

- El alcance (o `scope` en inglés) determina si el comportamiento de las variables es global o local.
  - El tipo de alcance global permite el acceso completo independientemente del nivel de profundidad donde será llamada.
  - Mientras que el alcance local no permite el acceso desde cualquier punto y está delimitado por los límites del bloque más próximo en el que fue declarada.

### Definición usando `var`:

```javascript
// var uses in a global scope
var globalVariable = 'This is a global string';

function stuffWithAnotherScope() {
  // Access and prints the follow string: 'This is a global string' in the funcion scope
  console.log(globalVariable);
}

if (someIsTrue) {
  globalVariable = 'Change the original value in a global scope';
}
```

### Definición usando `let`:

```javascript
function stuffWithAnotherScope() {
  let someVariable = 'This is our string declared as a let in a var';

  if (somethingHappen) {
    someVariable = 'Changed original string value';
  }
}

// Can't access to variable, because the const was declared inside the body function
console.log(someVariable);
```

### Definición usando `const`:

```javascript
function stuffWithAnotherScope() {
    // this is a string saved in a constant variable
    const randomString = 'This is a constant string';
}

// Can't access to variable, because the const was declared inside the body function
console.log(randomString);

// Declare a named function
const myNamedFunction = () => {...}
```
