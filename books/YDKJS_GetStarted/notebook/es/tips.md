# Tips

### Modo Estricto

```javascript
// solo espacios en blanco y cometarios son permitidos
// antes de usar la sentencia
'use strict';
// el resto del archivo correra en modo estricto
// ...
```

### No reusar variables

```javascript
// se declara como un tipo boolean
let isNumber = true;

if (isNumber) {
  // bad: reusar la variable y cambiar el tipo de dato a texto
  isNumber = 'I am a number';
}
```

### Comparaciones

```javascript
// cuando se usa el doble igual (==) sera verdadero, porque es una comparacion no estricta
42 == '42'; // true
1 == true; // true

// usando el triple igual (===) es falsa, porque la comparación estricta
// toma en cuenta el valor y el tipo de dato
42 === '42'; // false
1 === true; // false
```

### Comparaciones coercitivas

```javascript
const arr = ['1', '10', '100', '1000']

// ejemplo de una comparación coercitivas segura porque solo se ejecutará 3 ocasiones
for (let i = 0; i < arr.length && arr[i] < 500) {
  console.log(arr[i]); // will run 3 times
}

// usando la comparación alfabética
let x = '10';
let y = '9';

x < y; // true, porque el texto se compara como un diccionario
```
