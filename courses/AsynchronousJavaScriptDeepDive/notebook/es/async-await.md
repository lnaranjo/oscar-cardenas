# Async / Await

Las palabras clave `async & await` aparecieron en JS después de las promesas, el propósito principal es simplificar nuestro código de promesas. Básicamente permite escribir código basado en promesas como si fuera síncrono pero sin bloquear el hilo de ejecución.

El siguiente ejemplo muestra cómo crear una función asíncrona:

```javascript
// usamos la palabra reservada async para definirla
const myAsyncFunction = async function () {
  // doStuff...
};
```

Ahora veamos la diferencia entre una función asíncrona de una función síncrona:

```javascript
const plainFunction = function () {
  console.log('plainFunction');
  return 'done';
};

const asyncFunction = async function () {
  console.log('asyncFunction');
  return 'done';
};
```

Mientras que la funcion plana retorna el valor del string `done`, la función asíncrona retorna una promesa:

```javascript
const plainResult = plainFunction(); // show in console: plainFunction
const asyncResult = asyncFunction(); // show in console: asyncFunction

console.log(plainResult); // done
console.log(asyncResult); // { Promise: {...} }
```

Las funciones asíncronas nos permiten realizar peticiones a las APIs remotas, en el siguiente ejemplo realizamos preticion de los filmes de la serie Star Wars:

```javascript
const getFilms = async function () {
  const url = 'https://swapi.com/api/films';
  const data = await fetch(url).then((response) => response.json()); // se realiza la peticion
  const films = data.results;

  console.log({ films }); // print a list of all results

  return data;
};

getFilms();
console.log('Print this because is an async function');
```

### Manejo de errores

Para el manejo de errores usando `async/await` podemos usar la sentencia de bloque `try/catch` para contener el error y definir un flujo de salida controlado.

```javascript
async function someFunctionWithError() {
  try {
    const request = await fetch(url);
    const response = await request.json();
  } catch (error) {
    console.error(`Catch if exists an error, ${error}`);
  }
}
```

### Arreglo de Promesas

En ocasiones es necesario realizar múltiples peticiones a un servicio o realizar actividades asíncronas en un mismo tiempo de ejecución; para realizarlo es posible generar arreglos de promesas y así poder ejecutarlas al mismo tiempo:

Usemos la sentencia `for-of` para ejecutar cada una de las peticiones en el arreglo de promesas:

```javascript
const promises = [fetch(url1), fetch(url2), fetch(url3)];

// iterate each promise resolve
for await (let promise of promises) {
  console.log(promise);
}
```

También es posible ejecutar las peticiones usando la sentencia Promise.all para ejecutar las sentecias y manejar las respuestas en un procesamiento diferente, veamos el siguiente ejemplo:

```javascript
(async function () {
  const [request1, request2, request3] = await Promise.all([
    fetch(url1),
    fetch(url2),
    fetch(url3),
  ]);

  const response1 = await request1.json();
  const response2 = await request2.json();
  const response3 = await request3.json();

  console.log({
    response1,
    response2,
    response3,
  });
});
```
