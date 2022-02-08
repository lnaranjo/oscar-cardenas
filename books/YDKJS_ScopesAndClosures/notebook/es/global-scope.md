# Around the Global Scope

El `global scope` de un programa JS es un tema rico, con mucha más utilidad y matices de los que probablemente supongas. Comprender plenamente el `global scope` es fundamental para dominar el uso del `lexical scope` para estructurar tus programas.

## Why Global Scope?

Con respecto al browser, existen 3 formas principales de ejecutar un programa.

La primer forma es usando directamente ES Modules (sin transpilar) y cargándolos individualmente por el entorno de JS.

La segunda es usando algún `builder` como un agrupador de archivos para entregar al motor de JS solo un proceso mediante el uso de un archivo grande.

Veamos una posibilidad de compilación resultante de un proceso por un `builder`:

```javascript
(function wrappingOuterScope() {
  var moduleOne = (function one() {
    // ..
  })();
  var moduleTwo = (function two() {
    // ..
    function callModuleOne() {
      moduleOne.someMethod();
    }
    // ..
  })();
})();
```

La tercera tiene que ver con el uso de una herramienta que permita cargar de forma individual mediante el uso de los tags `<script>` o algún otro sistema dinámico de carga de recursos.

Ahora veamos como quedaría usando la tercer forma:

```javascript
var moduleOne = (function one() {
  // ..
})();
var moduleTwo = (function two() {
  // ..
  function callModuleOne() {
    moduleOne.someMethod();
  }
  // ..
})();
```

## Where Exactly is this Global Scope?

Existen distintos `global scope` en JS, dependiendo en donde se ejecutará el programa, es decir, normalmente se pueden decir que JS puede ejecutar principalmente en un entorno de `Node` o bien en un entorno de un `Browser`.

### Globals Shadowing Globals

Una forma de prevención relacionada con las declaraciones globales es utilizar el uso de `let` y `const` para un scope orientado a bloques. De lo contrario se corre el riesgo de sobreescribir las variables que se encuentren en diferentes scopes.

### DOM Globals

Exite la posibilidad de crear variables derivadas del DOM en donde su alcance es global y está determinado por el uso de un `id`. Veamos el siguiente ejemplo:

```html
<ul id="my-todo-list">
  <li id="first">Write a book</li>
  ..
</ul>
```

Podemos acceder a la referencia de la lista mediante el identificador del objeto `Window` de la siguiente forma:

```javascript
first;
// <li id="first">..</li>
window['my-todo-list'];
// <ul id="my-todo-list">..</ul>
```

### ¿Qué hay en Window?

Cuando definimos una variable mediante el uso de `var` el scope asignado por defecto es el global y se incorpora como propiedad de `Window`, lo que refiere un comportamiento "normal". ¿Pero que pasa si a esa misma variable se reasigna otro valor mediante `Window`? Ocurre algo extraño y es que esta toma el tipo de dato con el que fue creado originalmente. Veamos un ejemplo:

```javascript
var legos = 'legos';
typeof legos; // string
window.legos = 42;
typeof legos; // string
```

### Web Workers

Los Web Workers son una extensión de la plataforma web sobre el comportamiento del browserJS, que permite que un archivo JS se ejecute en un hilo completamente separado (en cuanto al sistema operativo) del hilo que está ejecutando el programa JS principal.

En un Web Worker, el objeto global está referenciado mediante la palabra reservada `self`:

```javascript
var studentName = 'Oscar';
let studentID = 42;
function hello() {
  console.log(`Hello, ${self.studentName}!`);
}
self.hello();
// Hello, Oscar!
self.studentID;
// undefined
```

### Herramientas de desarrollo (Console/REPL)

Durante la experiencia del desarrollo (DX) es importante el poder crear scripts para poder probar una funcionalidad deseada, en estos casos el scope que se estará creando es un `global scope`.

### ES Modules (ESM)

Con la introducción de `ES Modules` es posible conservar el scope original sin afectar el comportamiento de como se observa el `top-level`. Mediante el uso de `export` es posible realizar llamadas en otro contexto sin alterar el de ese fragmento de código.

```javascript
var studentName = 'Oscar';
function hello() {
  console.log(`Hello, ${studentName}!`);
}

hello(); // Hello, Oscar!

export hello;
```

## Node

Con Node ocurre que un `script` puede ser interpretado mediante el uso de `CommonJS`, el efecto práctico es que los programas nunca están en el `global scope`. Veamos el siguiente ejemplo que puede ejemplificar lo antes mencionado, cabe aclarar que es por motivos de explicación ya que actualmente no es lo usado:

```javascript
function Module(module, require, __dirname) {
  var studentName = 'Kyle';
  function hello() {
    console.log(`Hello, ${studentName}!`);
  }
  hello();
  // Hello, Kyle!
  module.exports.hello = hello;
}
```

## Global `this`

Una función puede construirse dinámicamente a partir del código almacenado en un valor de cadena con el constructor `Function()`, similar a `eval(..)`.

```javascript
const theGlobalScopeObject = new Function('return "hello"')();
console.log(theGlobalScopeObject()); // hello
```

A partir de ES2020, JS ha definido finalmente una referencia estandarizada al objeto de ámbito global, llamada `globalThis`. Por lo tanto, sujeto a la actualidad de los motores JS en los que se ejecuta tu código, puedes utilizar `globalThis` en lugar de cualquiera de esos otros enfoques. Podríamos incluso intentar definir un polyfill entre entornos que sea más seguro en los entornos JS anteriores a `globalThis`, como por ejemplo:

```javascript
const theGlobalScopeObject =
  typeof globalThis != 'undefined'
    ? globalThis
    : typeof global != 'undefined'
    ? global
    : typeof window != 'undefined'
    ? window
    : typeof self != 'undefined'
    ? self
    : new Function('return this')();
```
