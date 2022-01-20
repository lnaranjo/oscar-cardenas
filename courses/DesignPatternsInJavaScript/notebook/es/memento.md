# Memento

El manejo de cambios del sistema está determinado por el manejo de token, lo que permite no exponer el estado de la información.

### Motivación

- Un objeto o sistema presenta cambios.
- Existen formas de navegar entre esos cambios.
- Un forma puede ser el registrar todos los cambios.
- Otra forma puede ser el crear `snapshots` del sistema (`memento`).

### Implementación

Definamos dos clases que sirven como ejemplo de la implementación del pricipio `Memento`:

```javascript
class Memento {
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return new Memento(this.balance);
  }

  restore(m) {
    this.balance = m.balance;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}
```

Ahora veamos la interacción de como funciona:

```javascript
const ba = new BankAccount(100);
const m1 = ba.deposit(50);
const m2 = ba.deposit(25);
console.log(ba.toString());

// restore to m1
ba.restore(m1);
console.log(ba.toString());

// restore to m2
ba.restore(m2);
console.log(ba.toString());
```

### Resumen

- Puede ser usado para realizar rollbacks de forma arbitraria de los estados.
- Es un simple manjeador de estados basado en tokens, no con funciones.
- No requiere exponer directamente el/los estados para revertir el sistema.
- Puede ser implementado para hacer/deshacer.
