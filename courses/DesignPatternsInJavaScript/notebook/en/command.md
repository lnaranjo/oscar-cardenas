# Command

### Motivation

- Ordinary statements are perishable.
- An object allows us to represent an operation.
- They allow us to create GUI, macro-recording, multi-level undo/redo.

### Implementation

Let's see an example of how we implement this principle using the following classes:

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

We define actions to be evaluated in the `BankAccountCommand` class:

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

We create the instances and pass the previous actions to send to call in the command terminal the prompt where we will enter the actions.

```javascript
const ba = new BankAccount(100);

const cmd = new BankAccountCommand(ba, Action.deposit, 50);
cmd.call();
console.log(ba.toString());

console.log('Performing undo:');
cmd.undo();
console.log(ba.toString());
```

### Summary

- We can encapsulate all the details of an operation in a separate object.
- Through the command line application we can define the input actions.
- It allows to create compound commands (macros).
