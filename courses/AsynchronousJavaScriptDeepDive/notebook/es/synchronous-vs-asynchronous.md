# Síncrono vs Asíncrono

### Síncrono

| Desventajas                       | Ventajas                     |
| --------------------------------- | ---------------------------- |
| Puede bloquar el hilo de procesos | Fácil de escribir y entender |
| Menor performance                 |                              |

### Asíncrono

| Desventajas          | Ventajas                                 |
| -------------------- | ---------------------------------------- |
| Difícil de entender. | Aumenta el rendimiento                   |
| Difícil de escribir  | Elimina el bloquedo de hilos de procesos |

### Tabla comparativa

| Tópico                      | Síncrono | Asíncrono |
| --------------------------- | -------- | --------- |
| Fácil de leer y escribir    | si       | no        |
| Aumenta el rendimiento      | no       | si        |
| Bloquea el hilo del proceso | si       | not       |

Si consideramos los siguientes ejemplos para trazar algunas diferencias entre la comprobación de los siguientes ejemplos.

```javascript
const syncTest = function () {
  console.log('Start of code');
  alert('Hey, stop the code');
  console.log('End of code');
};

const syncTest2 = function () {
  console.log('Inside of second function');
};

syncTest();
syncTest2();
```

La salida en consola sería:

```
$ Start of code
Launch the alert
$ End of code
$ Inside of second function
```

Ahora, considera los siguientes cambios en el código:

```javascript
const asyncTest = function () {
  setTimeout(function () {
    console.log('Start of code');
    alert('Hey, stop the code');
    console.log('End of code');
  }, 1000);
};

const asyncTest2 = function () {
  console.log('Inside of second function');
};

asyncTest();
asyncTest2();
```

La salida es diferente, porque el método `setTimeout` retrasa la ejecución en 1 segundo, por lo que la nueva salida es:

```
$ Inside of second function
$ Start of code
Launch the alert
$ End of code
```
