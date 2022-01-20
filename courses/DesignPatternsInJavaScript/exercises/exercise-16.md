# Exercise 16

### Objective

Our system has any number of instances of Participant classes. Each Participant has a value integer attribute, initially zero.

A participant can `say()` a particular value, which is broadcast to all other participants. At this point in time, every other participant is obliged to increase their value by the value being broadcast.

Example:

- Two participants start with values 0 and 0 respectively
- Participant 1 broadcasts the value 3. We now have Participant 1 value = 0, Participant 2 value = 3
- Participant 2 broadcasts the value 2. We now have Participant 1 value = 2, Participant 2 value = 3

### Solution

```javascript
class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(index) {
    this.handlers.delete(index);
  }

  fire(sender, args) {
    this.handlers.forEach((handler) => {
      handler(sender, args);
    });
  }
}

class Mediator {
  constructor() {
    this.alert = new Event();
  }

  broadcast(sender, number) {
    this.alert.fire(sender, number);
  }
}

class Participant {
  constructor(mediator) {
    this.mediator = mediator;
    this.value = 0;
    mediator.alert.subscribe(this.alert.bind(this));
  }

  alert(sender, number) {
    if (sender !== this) this.value += number;
  }

  say(number) {
    this.mediator.broadcast(this, number);
  }
}
```
