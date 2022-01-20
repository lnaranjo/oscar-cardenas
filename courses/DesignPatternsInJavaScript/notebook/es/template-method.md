# Template Method

Define un esqueleto de uso del algoritmo con la completa implementación de sus subclases.

### Motivación

- Los algoritmis pueden ser descompuestos en partes específicas.
- `Strategy` lo hace a través de la composición.
- `Template Method` hace lo mismo a través de la herencia.

### Implementación

Veamos mendiante la creación de un juego básico de ajedrez la implementación del mismo.

```javascript
class Game {
  constructor(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
    this.currentPlayer = 0;
  }

  run() {
    this.start();
    while (!this.haveWinner) {
      this.takeTurn();
    }
    console.log(`Player ${this.winningPlayer} wins.`);
  }

  start() {}
  get haveWinner() {}
  takeTurn() {}
  get winningPlayer() {}
}

class Chess extends Game {
  constructor() {
    super(2);
    this.maxTurns = 10;
    this.turn = 1;
  }

  start() {
    console.log(
      `Starting a game of chess with ${this.numberOfPlayers} players.`
    );
  }

  get haveWinner() {
    return this.turn === this.maxTurns;
  }

  takeTurn() {
    console.log(`Turn ${this.turn++} taken by player ${this.currentPlayer}.`);
    this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;
  }

  get winningPlayer() {
    return this.currentPlayer;
  }
}

const chess = new Chess();
chess.run();
```

### Resumen

- Definir un algoritmo de alto nivel.
- Definir las partes que lo constituyen vacías.
- La herencia proporciona las sobre-escrituras necesarias.
