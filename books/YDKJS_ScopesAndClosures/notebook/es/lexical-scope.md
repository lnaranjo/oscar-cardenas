# Lexical Scope

La existencia de algunos tipos de `scope` depende en mayor medida de la profundidad en donde se encuentre la variable, es decir, cada variable y función puede tener un contexto de ejecución determinada por la escritura e interpretación del código.

## Nested Scope

Cuando hablamos de un anidamiento del scope podemos decir que depende mucho sobre la jerarquía en la que se estarán ejecutando las sentencias y adicional sobre el nivel de profundidad en la pila de ejecución en donde posteriormente se ejecutaran de forma ordenada.

### Lookup Failures

Dependiendo si el código se ejecuta bajo el criterio estricto o no, se puede derivar en un error cuando se accede a una referencia que no está identificada.

Supongamos que una variable es un `source` que no se encuetra resuelto, podrá ser identificada como no declarada, lo cuál haría un error de referencia (`ReferenceError`). Pero si es un `target` desde el momento de ejecutar el código se lanzará el error `ReferenceError`.
