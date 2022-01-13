# Arreglos

Un arreglo es un una estructura de datos ordenada mediante índices, en donde cada índice puede ser un tipo de dato diferente.

### Consideraciones:

- El tamaño del arreglo se encuentra determinado por la propiedad `length` y es completamente independiente del contenido almacendado en el arreglo.
- El primer índice es representado por `0` y el último elemento es determinado por `length - 1`.
- En Javascript existen métodos para manipular, reorganizar y retornar nuevas estructuras después de que a estas se le hagan tratamientos.

### Declaración simple:

```javascript
// puede ser declarado como vacío
const myArray = [];

// puede ser declarado con valores iniciales
const initializedArray = [1, 2, 3, 4, 5];
```

### Acceso a un índice específico:

```javascript
const letters = ['a', 'b', 'c', 'd', 'e'];

// obtenemos el primer elemento
letters[0];

// obtenemos la letra "c"
letters[2];

// obtenemos la letra "e"
letters[4];
// o también de esta forma obtenemos el último elemento
letters[letters.length - 1];
```

### Algunos métodos para manipular un arreglo:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map: retorna un arreglo con el cuadrado de los números
const squaredNumbers = numbers.map((number) => number * number);
console.log(squaredNumbers); // [1, 4, 9, 16, 25, 36, 64, 81, 100]

// filter: retorna un nuevo arreglo con los elementos que cumplan con la condición
const oddNumbers = numbers.filter((number) => !!(number % 2));
console.log(oddNumbers); // [1, 3, 5, 7, 9]

const evenNumbers = numbers.filter((number) => !(number % 2));
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// reduce: retorna un arreglo, pero también puede retornar otro tipo de dato dependiendo de la función
const sumAllValues = numbers.reduce(
  (accumulator, number) => (accumulator += number),
  0
);
console.log(sumAllValues); // 55
```
