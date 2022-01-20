# Chain Of Responsibility

Definido como una cadena de componentes que permiten procesar comandos o consultas, además de algunos permite terminar los procesos encadenados.

### Motivación

- Se quiere determinar una forma clara y rápida de identificar la responsabilidad.
- Determinar el flujo de una secuencia de eventos.

### Implementación

Creamos las dos clases que sirven como base para crear el ejemplo.

```javascript
class Creature {
  constructor(name, attack, defense) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
  }

  toString() {
    return `${this.name} (${this.attack}/${this.defense})`;
  }
}

class CreatureModifier {
  constructor(creature) {
    this.creature = creature;
    this.next = null;
  }

  add(modifier) {
    if (this.next) this.next.add(modifier);
    else this.next = modifier;
  }

  handle() {
    if (this.next) this.next.handle();
  }
}
```

Ahora, defininmos las clases que extienden tomando en cuenta `CreatureModifier`.

```javascript
class NoBonusesModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log('No bonuses for you!');
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log(`Doubling ${this.creature.name}'s attack`);
    this.creature.attack *= 2;
    super.handle();
  }
}

class IncreaseDefenseModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    if (this.creature.attack <= 2) {
      console.log(`Increasing ${this.creature.name}'s defense`);
      this.creature.defense++;
    }
    super.handle();
  }
}
```

Por último, hacemos la creación de objetos.

```javascript
const goblin = new Creature('Goblin', 1, 1);
console.log(goblin.toString());

const root = new CreatureModifier(goblin);

//root.add(new NoBonusesModifier(goblin));

root.add(new DoubleAttackModifier(goblin));
//root.add(new DoubleAttackModifier(goblin));

root.add(new IncreaseDefenseModifier(goblin));

// eventually...
root.handle();
console.log(goblin.toString());
```

### Resumen

- Puede ser implementado mediante una cadena de referencias o con un constructor centralizado.
- En lista los objetos in la cadena para ser controlados mediante el orden o la prioridad.
- En una lista enlazada un miembro puede impedir procesamientos anteriores.
- Permite un control de vida mediante el soporte a remover objetos de la cadena.
