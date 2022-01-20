# Mediator

Un componente que facilita la comunicación entre otros componentes sin que necesariamente se conozcan o tengan acceso directo entre sí.

### Motivación

- Los componentes pueden interactuar con el sistema desde afuera como adentro.
- No tiene sentido que tener de referencias directas entre sí.
- La solucion es hacer que todos ellos se refieran a algún componente central que facilite la comunicación.

### Implementación

```javascript
class Person {
  constructor(name) {
    this.name = name;
    this.chatLog = [];
  }

  receive(sender, message) {
    let s = `${sender}: '${message}'`;
    console.log(`[${this.name}'s chat session] ${s}`);
    this.chatLog.push(s);
  }

  say(message) {
    this.room.broadcast(this.name, message);
  }

  pm(who, message) {
    this.room.message(this.name, who, message);
  }
}

class ChatRoom {
  constructor() {
    this.people = [];
  }

  broadcast(source, message) {
    for (let p of this.people)
      if (p.name !== source) p.receive(source, message);
  }

  join(p) {
    let joinMsg = `${p.name} joins the chat`;
    this.broadcast('room', joinMsg);
    p.room = this;
    this.people.push(p);
  }

  message(source, destination, message) {
    for (let p of this.people)
      if (p.name === destination) p.receive(source, message);
  }
}
```

Ahora podemos ver la ejecución de lo mismo:

```javascript
const room = new ChatRoom();
const john = new Person('John');
const jane = new Person('Jane');
const simon = new Person('Simon');

room.join(john);
room.join(jane);

john.say('hi room');
jane.say('oh, hey john');

room.join(simon);
simon.say('hi everyone!');
jane.pm('Simon', 'glad you could join us!');
```

### Resumen

- Crear un `mediator` y obtener un objeto que hace le hace referencia.
- El `mediator` crear una comunicación bidireccional con los componentes conectados.
- El `mediator` tiene la función de llamar a los componentes.
- Los componentes tienen métodos que pueden ser llamados por el `mediator`.
