# Callbacks

Los `callbacks` son muy importantes para extender las funcionalidades y permiten reutilizar el código y evitar que el código sea redundante y repetivo. La premisa original de los `callbacks` es la posibilidad de que se envíen como parámetros y que sean ejecutados en la función destino, con el fin de no bloquear el hilo de ejecución y comportarse de forma asíncrona.

Veamos una definción básica de un `callback`, en donde la función `logCall` se envía como el primer parámetro de la función `setTimeout` donde será ejecutada un segundo después:

```javascript
// define a function will be my callback
const logCall = function () {
  console.log('Logging inside logCall');
};

// pass the logCall function as a callback for setTimeout
setTimeout(logCall, 1000);
```

Unos de los usos mas frecuentes de los callbacks está relacionado con el manejo del DOM, para reutilizar funciones y enviarlas como parámetros, como por ejemplos en las funciones listeners, veamos el siguiente ejemplo:

```javascript
// function used as a callback
const listenClickButton = function (event) {
  console.log('Clicked in a button');
};

// get buttons from DOM
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');

// add a listener when clicked and pass the callback listenClickButton
button1.addEventListener('click', listenClickButton);
button2.addEventListener('click', listenClickButton);
```

Veamos un ejemplo donde definimos una función que recibe un `callback` para ejecutarlo cada que se cumple la condición de que el campo `school` sea igual a `east`:

```javascript
function processStudents(items = [], callback) {
  for (let item of items) {
    if (item.school.toLowerCase() === 'east') {
      typeof callback === 'function' && callback(item);
    }
  }
}
```

Usaremos el siguiente arreglo de objetos para realizar la búsqueda, en donde cada índice contiene campos para realizar las operaciones en la funcion definida anteriormente:

```javascript
const students = [
  { name: 'Mary', score: 90, school: 'East' },
  { name: 'James', score: 100, school: 'East' },
  { name: 'Steve', score: 40, school: 'East' },
  { name: 'Gabe', score: 90, school: 'West' },
  { name: 'Rachel', score: 85, school: 'East' },
  { name: 'Rochelle', score: 95, school: 'West' },
  { name: 'Lynette', score: 75, school: 'East' },
];
```

Cuando usamos la función le envíaremos dos parametros:

- En el primer parámetro enviaremos el arreglo de objetos, que es la estructura a la que aplicaremos los cambios.
- En el segundo parámetro enviaremos la función que será ejecutada como el `callback` en la cual haremos un `console.log` cunado el score sea mayor a 60

```javascript
processStudents(students, function ({ name, score }) {
  score >= 60 && console.log(`${name} passed!`);
});
```

En ocasiones, es posible ejecutar callbacks dentro de otras funciones para no bloquear el hilo de ejecución, consideremos el siguiente ejemplo:

```javascript
function determineTotal() {
  let total = 0;
  let count = 0;

  processStudents(students, function ({ score }) {
    total += score;
    count++;
  });

  console.log('Total Score: ' + total + ' - Total Count: ' + count);
}

determineTotal();
```

### Problemas con `Callbacks`

Ahora, es momento de hablar de los problemas con los `callbacks`, que principalmente se encuntran en dos puntos:

- **`callback hells`**: Este problema hace referencia principalmente al anidamiento en múltiples niveles, provocando que sea poco escalable y poco predecible.
- **`Inversion of Control`**: Cuando el código se ejecuta es difícil tomar el control después de que haya sido iniciado el proceso de ejecución, lo que limita la posiblidad de hacer búsquedas en casos de erroes o mejoras de rendimiento.
