# Singleton

Un componente que es instanciado en una sola ocasión.

### Motivación

- Algunos componentes es el único principio que tiene sentido, (databases, object factory).
- El llamado al constructor puede ser costoso.
- Es necesario preveenir que cualquiera puede crear un objeto.

### Implementación

Vemos como implementar el principio `Singleton`:

```javascript
class Singleton {
  constructor() {
    const instance = this.constructor.instance;

    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }
}

const s1 = new Singleton(); // original
const s2 = new Singleton(); // same instance of s1 const
```

### Monostate

Sobre el tema de `monostate` nos hace referencia sobre mantenener el último estado, veamos el siguiente ejemplo:

```javascript
class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }
  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }
  set age(value) {
    ChiefExecutiveOfficer._age = value;
  }

  toString() {
    return `CEO's name is ${this.name} ` + `and he is ${this.age} years old.`;
  }
}
ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

const ceo = new ChiefExecutiveOfficer();
ceo.name = 'Adam Smith';
ceo.age = 55;

const ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'John Gold';
ceo2.age = 66;

console.log(ceo.toString()); // Jonh Gold and he is 66 years old.
console.log(ceo2.toString()); // Jonh Gold and he is 66 years old.
```

### Resumen

- El constructor elije que retorna, nosotros podemos retornar la misma instancia.
- Con `monostate` tenemos muchas instancias con información compartida.
- Depender de `Singleton` es una mala idea, en su lugar podemos tener una dependencia.
