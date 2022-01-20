# Memento

System change management is determined by token management, which allows not exposing the state of the information.

### Motivation

- An object or system presents changes.
- There are ways to navigate between those changes.
- One way may be to log all changes.
- Another way can be to create `snapshots` of the system (`memento`).

### Implementation

Let us define two classes that serve as examples of the implementation of the `Memento` principle:

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

Now let`s see the interaction of how it works:

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

### Summary

- It can be used to perform arbitrary rollbacks of states.
- It is a simple state handler based on tokens, not functions.
- It does not require directly exposing the state(s) to rollback the system.
- It can be implemented to do/undo.
