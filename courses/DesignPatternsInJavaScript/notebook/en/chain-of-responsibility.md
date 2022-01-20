# Chain Of Responsibility

Defined as a chain of components that allow the processing of commands or queries, in addition to some that allow the termination of chained processes.

### Motivation

- You want to determine a clear and quick way to identify responsibility.
- Determine the flow of a sequence of events.

### Implementation

We create the two classes that serve as a basis for creating the example.

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

Now, we define the classes that extend taking into account `CreatureModifier`.

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

Finally, we make the creation of objects.

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

### Summary

- It can be implemented by means of a chain of references or with a centralized constructor.
- In list the objects in the chain to be controlled by order or priority.
- In a linked list a member can prevent previous processing.
- Allows a lifetime control by supporting the removal of objects from the chain.
