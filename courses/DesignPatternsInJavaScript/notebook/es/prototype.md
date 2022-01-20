# Prototype

Un objeto parcial o totalmente iniciado que puedes clonar y hacer uso.

### Motivación

- Los objetos complicados no pueden ser definidos desde cero.
- Un diseño existente (total o parcial) es un prototipo.
- Se puede clonar un prototipo y personalizarlo.
- Mediante `factory` se pueden clonar prototipos.

### Implementación

Consideremos las siguientes dos clases: Person y Address. Ahora veamos como es que interactuan entre ellas.

```javascript
class Address {
  constructor(street, state, country) {
    this.street = street;
    this.state = state;
    this.country = country;
  }

  toString() {
    return `${street}, ${state}, ${country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `Hello my name is ${this.name}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, I live at ${this.address.toString()}`
    );
  }
}

const oscar = new Person(
  'Oscar',
  new Address('Prados 82C', 'Morelos', 'Mexico')
);
```

Podemos ver que funciona de forma correcta, el problema con esto es que puede tener problemas proque es posible clonarlo importando todas las referencias, veamos el siguiente ejemplo:

```javascript
const oscar = new Person(
  'Oscar',
  new Address('Prados 82C', 'Morelos', 'Mexico')
);

const adriana = JSON.parse(JSON.stringify(oscar));
```

Para solucionar esto realizaremos una clase especializada en clonar el objeto:

```javascript
class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    const indx = this.types.findIndex(
      (t) => t.name === object.constructor.name
    );

    if (indx !== -1) {
      object.typeIndex = indx;
    }

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        this.makeRecursive(object[key]);
      }
    }
  }

  recontructionRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      const type = this.types[object.typeIndex];
      const obj = new type();

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null) {
          obj[key] = this.recontructionRecursive(object[key]);
        }

        delete obj.typeIndex;
        return obj;
      }
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    const copy = JSON.parse(JSON.stringify(object));
    return this.recontructionRecursive(copy);
  }
}
```

Ahora usemos la clase creada para poder clonar objetos con las mismas propiedades:

```javascript
const serializer = new Serializer([Person, Address]);

const adriana = serializer.clone(oscar);
```

### Resumen

- Permite copiar a profundidad.
- Permite personalización de instancias.
- Al aplicar el principio de `factory` obtenemos una práctica API para construir prototipos.
