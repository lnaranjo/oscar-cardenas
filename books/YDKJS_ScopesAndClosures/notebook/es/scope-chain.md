# The Scope Chain

Podemos decir que `scope chain` es el procedimiento para dar seguimiento de las referencias de ejecución en la pila, es decir, nos permite tener una trazabilidad de cuál es el orden y contexto donde las sentencias de código serán ejecutadas.

## Shadowing

Se refiere a la posibilidad de usar la misma definición de variable bajo dos scopes distintos y obtener resultados distintos.

Veamos el siguiente ejemplo para representar lo anteriormente dicho.

```javascript
var studentName = 'Suzy';

function printStudent(studentName) {
  studentName = studentName.toUpperCase();
  console.log(studentName);
}

printStudent('Frank');
// FRANK
printStudent(studentName);
// SUZY
console.log(studentName);
// Suzy
```

### Global Unshadowing Trick

Podemos usar variables declaradas en un scope diferente dentro de un scope anidado, determinado por la primera definición hecha al respecto.

Consideremos el siguiete script para ampliar la explicación:

```javascript
var studentName = 'Suzy';
function printStudent(studentName) {
  console.log(studentName);
  console.log(window.studentName);
}
printStudent('Frank');
// "Frank"
// "Suzy"
```

### Copying Is Not Accessing

```javascript
var special = 42;
function lookingFor(special) {
  var another = {
    special: special,
  };
  function keepLooking() {
    var special = 3.141592;
    console.log(special);
    console.log(another.special); // Ooo, tricky!
    console.log(window.special);
  }
  keepLooking();
}
lookingFor(112358132134);
// 3.141592
// 112358132134
// 42
```

En el ejemplo anterior vemos la referencia a la variable `special` donde podemos observar 3 comportamientos y formas distintas de acceder a los mismos valores.

## Function Name Scope

Una declaración de función, creará un identificador en el scope circundante (en este caso este caso, el ámbito global).

Una diferencia importante entre las declaraciones de función y las expresiones de función es lo que ocurre con el identificador del nombre de la función. Considere una expresión de función con nombre:

```javascript
var askQuestion = function ofTheTeacher() {
  // ..
};
```

Sabemos que askQuestion termina en el ámbito externo. ¿Pero qué pasa con el identificador `ofTheTeacher`? Para las declaraciones formales de funciones, el identificador del nombre termina en el ámbito externo/cierre, por lo que puede ser razonable asumir que eso es cierto aquí. Pero `ofTheTeacher` se declara como un identificador dentro de la propia función:

```javascript
var askQuestion = function ofTheTeacher() {
  console.log(ofTheTeacher);
};
askQuestion();
// function ofTheTeacher()...
console.log(ofTheTeacher);
// ReferenceError: ofTheTeacher is not defined
```

## Funciones Flecha

En ES6 se agregó una declaración adicional para las funciones flechas, la cual no requiere la palabra reservada `function` en la declaración de la misma, además de que no es necesario agregar `return` en el caso donde se requiera retornar algún valor derivado.

La particularidad de estás funciones radica en que son lexicamente anónimas, es decir, que no tienen relacion directa con el identificador que referencia a la función.

```javascript
var askQuestion = () => {
  // ..
};
askQuestion.name; // askQuestion
```

Sin embargo, existe una particularidad de que permite crear múltiples y complejas maneras de declarar una misma función mediante el uso de abreviaturas en sintaxis, como podemos ver en el siguiente ejemplo:

```javascript
() => 42;
(id) => id.toUpperCase();
(id, name) => ({ id, name });
(...args) => {
  return args[args.length - 1];
};
```

Por último uno de los errores más comúnes está relacionado con la afirmación de que las funciones flecha se comportan de forma diferente respecto al `lexical scope` de las funciones que usan `function` para su declaración.

Además de ser anónimas y no tener forma declarativa, tienen las mismas reglas de `lexical scope` que las funciones `function`.
