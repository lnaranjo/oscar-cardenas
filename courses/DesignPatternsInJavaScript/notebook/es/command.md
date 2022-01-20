# Command

### Motivación

- Las declaraciones ordinarias son perecederas.
- Un objeto permite representar una operación.
- Nos permiten crear GUI, macro-recording, multi-level undo/redo.

### Implementación

Veamos un ejemplo de como implementamos este principio mediante las siguientes clases:

```javascript
class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}, balance is now ${this.balance}`);
  }

  withdraw(amount) {
    if (this.balance - amount >= BankAccount.overdraftLimit) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}, balance is now ${this.balance}`);
      return true;
    }
    return false;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}
BankAccount.overdraftLimit = -500;
```

Definimos acciones a evaluar en la clase `BankAccountCommand`:

```javascript
const Action = Object.freeze({ deposit: 1, withdraw: 2 });

class BankAccountCommand {
  constructor(account, action, amount) {
    this.account = account;
    this.action = action;
    this.amount = amount;
    this.succeeded = false;
  }

  call() {
    switch (this.action) {
      case Action.deposit:
        this.account.deposit(this.amount);
        this.succeeded = true;
        break;
      case Action.withdraw:
        this.succeeded = this.account.withdraw(this.amount);
        break;
    }
  }

  undo() {
    if (!this.succeeded) return;
    switch (this.action) {
      case Action.deposit:
        this.account.withdraw(this.amount);
        break;
      case Action.withdraw:
        this.account.deposit(this.amount);
        break;
    }
  }
}
```

Creamos las instancias y pasamos las acciones previas para mandar a llamar en la terminal de comandos el prompt donde ingresaremos las acciones.

```javascript
const ba = new BankAccount(100);

const cmd = new BankAccountCommand(ba, Action.deposit, 50);
cmd.call();
console.log(ba.toString());

console.log('Performing undo:');
cmd.undo();
console.log(ba.toString());
```

### Resumen

- Podemos encapsular todos los detalles de una operación en un objeto separado.
- Mediante la aplicación de línea de comandos podemos definir las acciones de entrada.
- Permite crear comandos compuestos (macros).
