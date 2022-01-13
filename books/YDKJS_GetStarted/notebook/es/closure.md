# Closures

### Consideraciones:

- Es una de las funcionalidades de programación más extendidas.
- Es una función para recordar y seguir accediendo a variables de fuera de este ámbito incluso cuando la función se ejecuta en un ámbito diferente.
- Es una parte natural de una función.
- Para observarlo se debe ejecutar una función en un ámbito diferente al que se definió originalmente la función.

### Declaración simple de un `closure`

```javascript
function greeting(msg) {
  return function who(name) {
    console.log(`${msg}, ${name}`);
  };
}

const hello = greeting('Hola');
const howdy = hello('Oscar');
howdy; // Hola, Oscar

hello('Luis');
// Hola, Luis
```

Otro ejemplo, sería poder definir un contador mediante un closure.

```javascript
// define un contador usando un closure
function counter(step = 1) {
  let count = 0;
  return function increaseCount() {
    count += step;
    return count;
  };
}

const incBy2 = counter(2);
incBy2(); // 2
incBy2(); // 4
incBy2(); // 6
incBy2(); // 8
incBy2(); // 10
```

Uno de los usos más extendidos es la capacidad de crear funciones para realizar peticiones a las APIs, en el siguiente ejemplo podemos ver una posible implementación:

```javascript
// se puede definir un `fetch` mediante un closure
function getSomeData(url) {
  fetcher(url, function onResponse(data) {
    console.log({ data });
  });
}

getSomeData('https://unosquare.com'); // { data: [SOME_DATA_HERE] }
```

Por último, podemos utilizar métodos como `call` para extender la funcionalidad de un closure, por ejemplo:

```javascript
function classroom(teacher) {
  return function study() {
    console.log(`${teacher} estudia ${this.topic}`);
  };
}

const assignment = classroom('Oscar');
const homework = {
  topic: 'JS',
  assignment,
};

homework.assignment(); // Oscar estudia JS

// usando el método `call`
const anotherHomework = {
  topic: 'Matemáticas',
};
assignment.call(anotherHomework); // Oscar estudia Matemáticas
```
