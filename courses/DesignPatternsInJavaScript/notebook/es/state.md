# State

Un patrón en donde el comportamiento del objeto está determinado por su estado.

### Motivación

- Tomar decisiones mediante el uso de acciones.
- Los cambios de estado deben ser explícitos o en respuesta a un evento.

### Implementación

Veamos como es posible la implementación de un estado básico:

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

Hagamos una máquina de estados básica, definimos los enum que serán nuetros estados:

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

Después definimos las reglas que vamos a tener por cada estado:

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

Hacemos una función que active el prompt para obtener la entrada:

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

Ejecutamos posteriormente la máquina de estado:

```javascript
const state = State.offHook;
const exitState = State.onHook;
getInput();
```

### Resumen

- Cuando existe bastente complejidad es una forma eficiente de definir eventos y activadores.
- Puede definir estados de entrada y salida.
- Puede definir acciones cuando los eventos particulares causan transición.
- Mantiene las condiciones en las transiciones.
- Una acción por defecto es definida para los eventos que no tienen transición.
