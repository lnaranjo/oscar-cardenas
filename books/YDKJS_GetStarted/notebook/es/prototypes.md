# Prototipos

### Consideraciones

- La palabra clave `this` es la característica de un objeto que permite accesar a una propiedad o método dentro de un objeto o clase.
- Se puede llamar como un enlace oculto entre dos objetos en el momento de cuando se crea el objeto.
- Los prototipos permiten agrear funcionalidades o propiedades nuevas a las establecidas por defecto y que permiten realizar operaciones entre esas mismas.

### Distintas formas de crear prototipos

Supongamos la definición de un objeto:

```javascript
const homework = {
  topic: 'JS',
};
```

Ahora podemos crear un nuevo objeto, usando la función `Object.create` lo que permite iniciarlo con las propiedades y valores del objeto anterior:

```javascript
const otherHomework = Object.create(homework);
console.log(otherHomework.topic); // 'JS'
```

En el caso de cambiar el valor de la propiedad `topic`, el valor del objeto original se mantiene:

```javascript
otherHomework.topic = 'Math';

console.log(homework.topic); // 'JS'
console.log(otherHomework.topic); // 'Math'
```

Una de las ventajas de usar prototipos es la capacidad de sobreescribir las propiedades o métodos, revisemos el siguiente ejemplo:

```javascript
const newHomework = {
  study() {
    console.log(`Please study ${this.topic}`);
  },
};

const jsHw = Object.create(newHomework);
jsHw.topic = 'JS';
jsHw.study(); // Please study JS

const mathHw = Object.create(newHomework);
mathHw.topic = 'Math';
mathHw.study(); // Please study Math
```
