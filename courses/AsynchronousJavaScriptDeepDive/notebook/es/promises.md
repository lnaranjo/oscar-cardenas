# Promsesas

Las promesas proporcionan un patrón asíncrono para resolver algunos problemas relacionados con los `Callbacks` y es una gran característica introducida como parte de la actualización de ECMAScript 6.

Pero, ¿qué define una promesa en Javascript?

- Es un objeto con propiedades y métodos que permiten trabajar de forma asíncrona.
- Representa la finalización o el fracaso eventual de preceso asíncrono.
- Proporciona un valor resultante.

La definición simple de una promesa consta de la sentencia `Promise` que recibe un callback, en donde se incluyen dos métodos que son enviados mediante los argumentos del callback.

El primer argumento que fue enviado mediante el callback representa la función que debe ejecutarse cuando proceso haya sido correcto, mientras que el segundo parámetro representa la función que se ejecuta cuando ocurre un fallo en el proceso.

Veamos la siguiente definición de ejemplo :

```javascript
const myPromise = new Promise(function (resolve, reject) {
  if (someError) {
    reject('Some error');
  }

  resolve('the process is ok');
});
```

Ahora podemos ver un ejemplo práctico de como poder implementar una promesa que se ejecuta 4 segundos después de ser ejecutada:

```javascript
const asyncFunction = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('asyncFunction has resolved.');
    }, 4000);
  });
};
```

### Then / Catch / Finally

Mediante el uso de los métodos `then`, `catch` y `finally` podemos especificar el flujo que tomará la promesa en el momento que sea ejecutada de forma exitosa o incluso si la promesa ha fallado.

Tomando como ejemplo la promesa anteriormente declarada, podemos observar que la función llamada `resolve` que se ejecuta dentro del `setTimeout` realmente está determinada por la función anómima que es envía como parámetro del método `then`, por ejemplo:

```javascript
asyncFunction().then((text) => console.log(`Yeah! ${text}`));
```

Inclusive podemos agrgar una sentencia encadenada `catch` para realizar el manejo del error, para ello, vemos que la representación de la funcion reject está determinada por la función anómnima enviada como parámetro del método `catch`, por ejemplo:

```javascript
asyncFunction()
  .then((text) => console.log(`Yeah! ${text}`)) // resolve
  .catch((error) => console.log(`Something went wrong: ${error}`)); // reject
```

El método `finally`, siempre se ejecuta una vez finalizada la promessa, sin importar el estado, es decir, si fue exitoso o fallido, por ejemplo:

```javascript
asyncFunction()
  .then((text) => console.log(`Yeah! ${text}`)) // resolve
  .catch((error) => console.log(`Something went wrong: ${error}`)) // reject
  .finally(() => {
    // cleaning something
    // reset something
  });
```

En ocasiones, es necesario ejecutar promesas de forma anidada, como por ejemplo, que la entrada de una promesa sea la respuesta de una promesa previa y que el resultado esperado sea la respuesta de la última promesa.

Veamos el siguiente ejemplo, donde definimos una función que retorna una promesa:

```javascript
function customPromise(url, id) {
  return new Promise(function (resolve, reject) {
    if (isNaN(id)) {
      return reject('id must be a number');
    }

    resolve(url, id || 0);
  });
}
```

Usando la promesa anteriomente defina veamos un ejemplo donde se pueden anidar promesas:

```javascript
const p1 = custonPromise('https://unosquare.com', 1);

p1.then(function (url, id) {
  const p2 = customPromise(url, id || 1000);
  return p2;
}).then(console.log); // 'https://unosquare.com', 1000
```

### Promesas como variables

Cuando es necesario reutilizar una promesa bajo diferentes criterios es posible crear promesas que reciban parámetros y almacenar las promesas en variables para poder ejecutarlas en un tiempo posterior.

Veamos un ejemplo declarando una promesa que reciba parámetros:

```javascript
function setTimeoutCustom(time) {
  return new Promise(function (resolve, reject) {
    if (isNaN(time)) {
      return reject('time must be a number');
    }

    setTimeout(resolve, time);
  });
}
```

Ahora podemos implementar difentes promesas con diferente tiempo y haciendo procesos diferentes:

```javascript
const timer1 = setTimeoutCustom(1000);
timer1.then(() => console.log('after 1 seconds'));

const timer2 = setTimeoutCustom(10000);
timer2.then(() => console.info('after 10 seconds'));
```

### Creando promesas personalizadas

Las promesas nos permiten crear instancias personalizada sin necesidad de utilizar una función, solo es necesario almacenarlo en una variable para crear una nueva instancia.

Revisemos el siguiente ejemplo:

```javascript
const myCustomPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('After 3s send this string');
  }, 3000);
});
```

Ahora podemos usar la promesa personalizada de la siguiente forma:

```javascript
const promise = myCustomPromise();
console.log(promise); // { Promise: {...} }
```

### Usando el método `all` para múltiples peticiones

Cuando se necesita ejecutar ejecutar múltiples promesas en un mismo periodo de tiempo utilizamos el método all, ya que nos permite invocar todos los procesos sin importar el tiempo que tome cada uno de ellos, de tal forma que cuando se hayan completado todos los procesos de forma correcta nos envía el resultado de todas las promesas mediante un argumento del callback en el método then.

En el siguiente ejemplo podemos observar como es que este método trabaja con las promesas, primero definamos creamos algunas promesas y las guardamos como variables.

```javascript
const firstName = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Oscar');
    }, 3000);
  });
};

const lastName = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Cardenas');
    }, 4000);
  });
};

const middleName = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Jesus');
    }, 7000);
  });
};
```

Después vamos a iniciar un arreglo, donde en cada indice corresponde a una promesa:

```javascript
const promises = [firstName, middleName, lastName];
```

Ahora es momento de ejecutar todas las promesas definidas en el arreglo mediante el método `Promise.all`; cuando todas las promesas hayan sido completadas se ejecutará la función anómima y en mediante la cual se recibe el argumento `messages` con el contenido de cada uno de los strings.

```javascript
Promise.all(promises).then((messages) => {
  console.log(messages); // ['Oscar', 'Jesus', 'Cardenas']
});
```

De tal forma que el `console.log` se ejecutará despues de 7 segundos, que fue el mayor tiempo definido en la promesa `middleName`.

### Usando promesas en peticiones a APIs

Las promesas pueden ser usadas para realizar peticiones a recursos remotos como las APIs, encapsulando la petición en una función que reciba parámetros que permitan reutlizar la funcionalidad.

Veamos el siguiente ejemplo de implementación:

```javascript
function fetcher(path, props = {}) {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  return fetch(`${baseURL}/${path}`, props).then((response) => response.json());
}
```

Ahora es posible usar la misma promesa para obtener diferentes respuestas al cambiar los parámetros, veamos el siguiente ejemplo donde obtenemos los todos y los imprimimos en consola:

```javascript
// todos
fetcher('todos').then(({ results }) => console.log(results)); // [{...todo1...}, {...todo2...}, {...todoN...}]
```

Ahora usemos la misma promosa para imprimir los posts:

```javascript
// todos
fetcher('posts').then(({ results }) => console.log(results)); // [{...post1...}, {...post2...}, {...postN...}]
```

Y por último podemos usarlo para actualizar un post utilizando diferentes propiedades para realizar la petición:

```javascript
// todos
fetcher('post/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Learn promises',
    userId: 1,
    completed: false,
  }),
}).then(console.log); // {...post_1...}
```
