# Funciones

### Consideraciones

- En Javascript una `function` significa un procedimiento, que es una colección de declaraciones puede ser llamado muchas veces, puede proporcionar una entrada y devolver una o más salidas.
- Existen muchas formas de crear/declarar una función, cada forma depende del contexto y la usabilidad en el tiempo.

### Distintas formas de declarar una función:

#### Función declarada

```javascript
function awesomeFunction() {}
```

#### Función anónima

```javascript
const awesomeFunction = function () {};
```

#### Función nombrada

```javascript
const namedFunction = function someName() {};
namedFunction.name;
```

#### Función generador

```javascript
function* customGenerator() {}
```

#### Función asíncrona

```javascript
async function asyncFunction() {}
```

#### Función módulo

```javascript
export function five() {}
```

#### Función IIFE

```javascript
(function () {})();
(function namedFunctionIIFE() {})();
```

#### Función IIFE asíncrona

```javascript
(async function () {});
(async function asyncNamedFunctionIIFE() {});
```

#### Funciones flecha

```javascript
let f;
f = () => 42;
f = (x) => x * x;
f = (x, y) => x + y;
f = (x) => {
  return x;
};
f = async (x) => {
  const y = await (x * 2);
  return y;
};

operationFunction((x) => x * x);
```
