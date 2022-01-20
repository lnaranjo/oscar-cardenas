# State

A pattern where the behavior of the object is determined by its state.

### Motivation

- Making decisions through the use of actions.
- State changes must be explicit or in response to an event.

### Implementation

Let's see how the implementation of a basic state is possible:

```javascript
class Switch {
  constructor() {
    this.state = new OffState();
  }

  on() {
    this.state.on(this);
  }

  off() {
    this.state.off(this);
  }
}

class State {
  constructor() {
    if (this.constructor === State) throw new Error('abstract!');
  }

  on(sw) {
    console.log('Light is already on.');
  }

  off(sw) {
    console.log('Light is already off.');
  }
}

class OnState extends State {
  constructor() {
    super();
    console.log('Light turned on.');
  }

  off(sw) {
    console.log('Turning light off...');
    sw.state = new OffState();
  }
}

class OffState extends State {
  constructor() {
    super();
    console.log('Light turned off.');
  }

  on(sw) {
    console.log('Turning light on...');
    sw.state = new OnState();
  }
}

const sw = new Switch();
sw.on();
sw.off();
sw.off();
```

Let's make a basic state machine, we define the enum that will be our states:

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const State = Object.freeze({
  offHook: 'off hook',
  connecting: 'connecting',
  connected: 'connected',
  onHold: 'on hold',
  onHook: 'on hook',
});

const Trigger = Object.freeze({
  callDialed: 'dial a number',
  hungUp: 'hang up',
  callConnected: 'call is connected',
  placedOnHold: 'placed on hold',
  takenOffHold: 'taken off hold',
  leftMessage: 'leave a message',
});
```

Then we define the rules we are going to have for each state:

```javascript
const rules = {};

rules[State.offHook] = [
  {
    trigger: Trigger.callDialed,
    state: State.connecting,
  },
];

rules[State.connecting] = [
  {
    trigger: Trigger.hungUp,
    state: State.onHook,
  },
  {
    trigger: Trigger.callConnected,
    state: State.connected,
  },
];

rules[State.connected] = [
  {
    trigger: Trigger.leftMessage,
    state: State.onHook,
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook,
  },
  {
    trigger: Trigger.placedOnHold,
    state: State.onHold,
  },
];

rules[State.onHold] = [
  {
    trigger: Trigger.takenOffHold,
    state: State.connected,
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook,
  },
];
```

We make a function that activates the prompt to get the input:

```javascript
function getInput() {
  let prompt = [`The phone is currently ${state}`, "What's next:"];

  for (let i = 0; i < rules[state].length; ++i) {
    let t = rules[state][i].trigger;
    prompt.push(`${i}. ${t}`);
  }

  // force an extra line break
  prompt.push('');

  rl.question(prompt.join('\n'), function (answer) {
    let input = parseInt(answer);
    state = rules[state][input].state;

    if (state !== exitState) getInput();
    else {
      console.log('We are done using the phone.');
      rl.close();
    }
  });
}
```

We then run the state machine:

```javascript
const state = State.offHook;
const exitState = State.onHook;
getInput();
```

### Summary

- When there is enough complexity it is an efficient way to define events and triggers.
- You can define input and output states.
- Can define actions when particular events cause transition.
- Maintains conditions on transitions.
- A default action is defined for events that have no transition.
