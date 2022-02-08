# The Module Pattern

El módulo es uno de los patrones de organización de código más importantes de toda la programación. Se construyen inherentemente a partir de lo que ya hemos cubierto: la recompensa por sus esfuerzos en el aprendizaje del `lexical scope` y el `closure`.

## Encapsulation and Least Exposure (POLE)

La encapsulación se cita a menudo como un principio de la programación orientada a objetos (OO), pero es más fundamental y ampliamente aplicable que eso. El objetivo de la encapsulación es la agrupación o ubicación conjunta de la información (datos) y el comportamiento (funciones) que sirven a un propósito común.

Independientemente de la sintaxis o de los mecanismos de código, el espíritu de la encapsulación puede realizarse en algo tan sencillo como utilizar archivos separados para mantener trozos del programa general con un propósito común.

## What Is a Module?

Un módulo es una colección de datos y funciones relacionados (a menudo denominados métodos en este contexto), que se caracteriza por una división entre los detalles privados ocultos y los detalles públicos accesibles, que suele denominarse "API pública".

Un módulo también es de estado: mantiene cierta información a lo largo del tiempo, junto con la funcionalidad para acceder y actualizar esa información.

### Namespaces (Stateless Grouping)

Si se agrupa un conjunto de funciones relacionadas, sin datos, entonces no se tiene realmente la encapsulación esperada que implica un módulo. El mejor término para esta agrupación de funciones sin estado es un espacio de nombres:

```javascript
// namespace, not module
var Utils = {
  cancelEvt(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
  },
  wait(ms) {
    return new Promise(function c(res) {
      setTimeout(res, ms);
    });
  },
  isValidEmail(email) {
    return /[^@]+@[^@.]+\.[^@.]+/.test(email);
  },
};
```

`Utils` es una útil colección de utilidades, aunque todas son funciones independientes del estado. Reunir la funcionalidad es generalmente una buena práctica, pero eso no hace que esto sea un módulo. Más bien, hemos definido un espacio de nombres `Utils` y hemos organizado las funciones bajo él.

### Data Structures (Stateful Grouping)

Incluso si agrupas datos y funciones con estado, si no estás limitando la visibilidad de ninguno de ellos, entonces te estás quedando corto en el aspecto POLE de la encapsulación; no es particularmente útil etiquetar que un módulo.

```javascript
// data structure, not module
var Student = {
  records: [
    { id: 14, name: 'Kyle', grade: 86 },
    { id: 73, name: 'Suzy', grade: 87 },
    { id: 112, name: 'Frank', grade: 75 },
    { id: 6, name: 'Sarah', grade: 91 },
  ],
  getName(studentID) {
    var student = this.records.find((student) => student.id == studentID);
    return student.name;
  },
};
Student.getName(73); // Suzy
```

### Modules (Stateful Access Control)

Para encarnar todo el espíritu del patrón de módulos, no sólo necesitamos la agrupación y el estado, sino también el control de acceso a través de la visibilidad (privado vs público).

```javascript
var Student = (function defineStudent() {
  var records = [
    { id: 14, name: 'Kyle', grade: 86 },
    { id: 73, name: 'Suzy', grade: 87 },
    { id: 112, name: 'Frank', grade: 75 },
    { id: 6, name: 'Sarah', grade: 91 },
  ];
  var publicAPI = {
    getName,
  };
  return publicAPI;
  // ************************
  function getName(studentID) {
    var student = records.find((student) => student.id == studentID);
    return student.name;
  }
})();
Student.getName(73); // Suzy
```

## Node CommonJS Modules

Los módulos de CommonJS se comportan como instancias singleton, de forma similar al estilo de definición de módulos IIFE presentado anteriormente. No importa cuántas veces se `require(..)` el mismo módulo, sólo se obtienen referencias adicionales a la única instancia del módulo compartido; `require(..)` es un mecanismo de todo o nada; incluye una referencia de toda la API pública expuesta del módulo. Para acceder efectivamente sólo a una parte de la API.

Al igual que el formato de módulo clásico, los métodos exportados públicamente de la API de un módulo de CommonJS mantienen cierres sobre los detalles internos del módulo. Así es como el estado del módulo singleton se mantiene a lo largo de la vida de tu programa.

## Modern ES Modules (ESM)

El formato ESM comparte varias similitudes con el formato CommonJS. ESM está basado en archivos, y las instancias de los módulos son singletons, con todo privado por defecto. Una diferencia notable es que se asume que los archivos ESM son de modo estricto, sin necesidad de un pragma "use strict" al principio. No hay manera de definir un ESM como modo no estricto.

## Exit Scope

El patrón de módulo es la conclusión de cómo podemos utilizar las reglas de alcance léxico para colocar las variables y las funciones en lugares adecuados. POLE es la postura defensiva privada por defecto que siempre adoptamos, asegurándonos de evitar la sobreexposición e interactuar sólo con la mínima superficie pública de la API necesaria.
