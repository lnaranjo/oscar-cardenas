# Mediator

A component that facilitates communication between other components without necessarily knowing or having direct access to each other.

### Motivation

- The components can interact with the system from outside as well as inside.
- It does not make sense to have direct references to each other.
- The solution is to make them all refer to some central component that facilitates communication.

### Implementation

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

Now we can see the execution of the same:

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

### Summary

- Create a `mediator` and get an object that references it.
- The `mediator` creates a bidirectional communication with the connected components.
- The `mediator` has the function to call the components.
- The components have methods that can be called by the `mediator`.
