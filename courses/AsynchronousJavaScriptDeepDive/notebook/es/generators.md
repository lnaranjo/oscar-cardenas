# Generadores

Los `generators` existen desde hace más tiempo que `async/await`. Básicamente un generador es una forma de escribir código que puede pausarse y continuar en un momento posterior. Un generador es una función que podemos usar para hacer que el código se detenga y no continúe hasta que se lo digamos posteriormente.

Un `generator` consta de dos partes principales. La primera parte consiste en definir una función como una función generadora, lo que requiere el uso del carácter asterisco después de la palabra reservada `function`. La segunda parte requiere el uso de la palabra clave `yield` en los lugares donde se necesite hacer una pausa para posteriormente ser ejecutada con el método `next()`.

Veamos la forma de declarar un `generator` de forma simple, usando `*` después de la palabra reservada `function`

```javascript
const myGenerator = function* () {
  let x = 0;
  console.log('start');
  x++;
  console.log(x);
  x++;
  console.log(x);
  console.log('finish');
  return x;
};

const gen = myGenerator();
const value = gen.next(); // { value: 3, done: true }
```

Uno de los propósitos de usar `generators` es la posibilidad de continuar con los procesos en un tiempo distinto al de ejecución, para ello usaremos la palabra clave `yield` para poder frenar y continuar con esos procesos mediante el uso del método `next()`.

```javascript
const myGenerator = function* () {
  let x = 0;
  console.log('start');
  x++;
  yield;
  console.log(x);
  x++;
  console.log(x);
  yield;
  console.log('finish');
  return x;
};

const gen = myGenerator();
let value = gen.next(); // { value: undefined, done: false }
// start

value = gen.next(); // { value: undefined, done: false }
// 1
// 2

value = gen.next(); // { value: 3, done: true }
// finish
```

Veamos un ejemplo con el fin de facilitar la compresión de lo que se hace con `generators`.

Supongamos que necesitamos crear una función que realiza el calculo de una secuencia de fibonacci, de tal forma que la propuesta puede quedar de la siguiente forma:

```javascript
const fibonacci = function (len, nums = [0, 1]) {
  let next = 0;
  let count = 2;
  let num1 = nums[0];
  let num2 = nums[1];

  while (count < len) {
    next = num1 + num2;
    num1 = num2;
    num2 = next;
    nums.push(next);
    count++;
  }

  return nums;
};
```

La función creada anteriormente cumple con el cálculo de la secuencia, sin embargo, cuando la longitud de la secuencia es demasiado larga el procesamiento provoca un bloqueo del hilo de ejecución hasta finalizar el último elemento.

Mediante el uso de `generators` podemos crear una mejor propuesta que nos permita tener control del crecimiento de la secuencia con el uso del método `next()` y así prevenir el bloqueo del hilo de ejecución.

```javascript
const fibonacci = function* (len, nums = [0, 1]) {
  let next = 0;
  let count = 2;
  let num1 = nums[0];
  let num2 = nums[1];

  while (count < len) {
    next = num1 + num2;
    num1 = num2;
    num2 = next;
    nums.push(next);
    count++;
    yield nums;
  }

  return nums;
};

const fib = fibonacci(1000);
fib.next(); // { value: [0, 1, 1], done: false }
fib.next(); // { value: [0, 1, 1, 2], done: false }
fib.next(); // { value: [0, 1, 1, 2, 3], done: false }
fib.next(); // { value: [0, 1, 1, 2, 3, 5], done: false }
// ...
fib.next(); // { value: [0, 1, 1, 2, 3, 5...], done: true }
```

### Usando un `Generator` para crear un `Iterator`

En términos simples un Iterator es un objeto que nos permite recorrer una colección y entregar un valor al haber completado ese proceso y como dicho proceso se implementa mediante el uso del método `next()` es posible crearlo a través de un generador, veamos el siguiente ejemplo:

```javascript
const arrayIterator = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
};
```

Ahora podemos enviar un arreglo que se irá ejecutando paso a paso a medida que se ejecute la función `next()`, de tal forma que nos permite saber mediante el campo `done` si se recorrió la totalidad del arreglo; por ejemplo:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
let arrIt = arrayIterator(arr);

arrIt.next(); // { value: 'a', done: false }
arrIt.next(); // { value: 'b', done: false }
arrIt.next(); // { value: 'c', done: false }
arrIt.next(); // { value: 'd', done: false }
arrIt.next(); // { value: 'e', done: true }
```

Por último tenemos una implementación bastante popular sobre los tipos de datos en los que no es posible iterar por defecto, como el `Object`, que al no tener especificado un iterador por defecto se puede definir y ser usado por los bucles, como el `for`.

Veamos el siguiente ejemplo, donde definimos un objeto con valores inciales:

```javascript
let myObject = {
  1: 'one',
  2: 'two',
  3: 'three',
};
```

Ahora, podemos definir el `Symbol.iterator` mediante el uso de un `generator`:

```javascript
myObject[Symbol.iterator] = function* () {
  for (let i = 1; i < 4; i++) {
    yield this[i];
  }
};
```

De tal forma que ahora puede ser iterado mediante el bucle `for` que originalmente solo trabajaba con arreglos:

```javascript
for (let v of myObject) {
  console.log(v);
}
// one
// two
// three
```
