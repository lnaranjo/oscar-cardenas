# Eventloop

El `eventloop` es un algoritmo que comprueba constantemente la pila de llamadas para ver si hay alguna llamada de función que deba ejecutarse. Cuando la pila de llamadas está vacía, la primera entrada de la cola de llamadas de retorno es empujada a la pila de llamadas para completar la ejecución. Esto sucede hasta que la cola está vacía.

### El motor de Javascript

El motor de Javascript es un componente de software encargado de ejecutar el código escrito en JS, podemos interpretarlo como un conjunto de componentes encargados de funciones específicas que permiten realizar las operaciones y sentencias del código escrito en Javascript.

Podemos dividir cada uno de los componentes de la siguiente forma:

- **`Eventloop`**
  - **`Heap`** (memoria): Es el espacio de memoria física que se utiliza para almacenar variables, funciones y objetos.
  - **`Stack`** (funciones): Aquí es donde se almacenan las funciones y las llamadas a la API (API web en los navegadores y API C/C++ en las máquinas locales a través de NodeJs).
- **`Web APIs`**: Son las funciones y/o propiedades incorporadas y por defecto del navegador o bien el Nodejs.
- **`Callback Queue`**: Podemos decir que es la pila de ejecución donde los callbacks son almacenados para su futura ejecución.

### El problema de Javascript

En Javascript existe un problema, este problema está relacionado con el rendimiento debido a que existe un solo hilo de ejecución, en otras palabras, no existe la posibilidad de ejecutar los procesos en paralelo.

Este peculiar problema ocasiona que los procesos que requieran mucho poder de cómputo o los procesos que tomen bastante tiempo en finalizar bloquearán el hilo de ejecución. La soluciones planteadas a continuación nos permiten entender como es posible optimizar las operaciones para incrementar el rendimiento y resolver problemas que de otra forma serían conceptualmente imposibles de concluir con Javascript.

### Callbacks y Promesas

Originalmente los `callbacks` fueron planteados como la primera solución al problema de la ejecución en un solo hilo. Esta solución está basada en el concepto de que se puede reutlizar las funciones que reciben como parámetros otras funciones, esta característica permite crear pilas asíncronas de ejecución y sobre todo evita que se bloquee el hilo de ejecución, ya que las funciones se irán resolviendo en segundo plano y en tiempos diferentes, lo que en escencia supone una mejora en el rendimiento de los programas.

La realidad de está solución es que es de las mas extendidas y usadas en Javascript, sin embargo, en aplicaciones grandes comienzan a surgir problemas relacionados con la escalabilidad, manteniento y cada vez se vuelve menos predecible para los equipos de desarrollo el como se deberá trabajar en mejoras futuras o en correción de errores. En el capítulo de `callbacks` se desarrolla a profundidad el concepto además de incluir algunos ejemplos de aplicación en situaciones reales.

Derivado de está última problemática, en la actualizacion de ECMAScript 6 (ES6), se introdujo una alternativa que tiene como objetivo corregir y preevenir los problemas relacionados con los callbacks proporcionando un marco de trabajo estandarizado y predecible con respecto a procesos costos en cómputo o de tiempo.

La idea original de usar `Promises` es tener la capacidad de mejorar la trazabilidad, predicibilidad y entendimiento de procesos síncronos mediante el uso de un marco de trabajo estandarizado y que además se encuentra como una funcionalidad integrada en el set de Javascript. En el capítulo de `Promises` podemos ampliar el concepto con ejemplos prácticos del día a día.
