# Exercise 19

### Objective

A combination lock is a lock that opens after the right digits have been entered. A lock is preprogrammed with a combination (e.g., 12345 ) and the user is expected to enter this combination to unlock the lock.

The lock has a Status field that indicates the state of the lock. The rules are:

If the lock has just been locked (or at startup), the status is LOCKED.

If a digit has been entered, that digit is shown on the screen. As the user enters more digits, they are added to Status.

If the user has entered the correct sequence of digits, the lock status changes to OPEN.

If the user enters an incorrect sequence of digits, the lock status changes to ERROR.

Please implement the CombinationLock class to enable this behavior. Be sure to test both correct and incorrect inputs.

Here is an example unit test for the lock:

```javascript
let cl = new CombinationLock([1, 2, 3, 4, 5]);
expect(cl.status).toEqual('LOCKED');
cl.enterDigit(1);
expect(cl.status).toEqual('1');
cl.enterDigit(2);
expect(cl.status).toEqual('12');
cl.enterDigit(3);
expect(cl.status).toEqual('123');
cl.enterDigit(4);
expect(cl.status).toEqual('1234');
cl.enterDigit(5);
expect(cl.status).toEqual('OPEN');
```

### Solution

```javascript
class CombinationLock {
  constructor(combination) {
    this.combination = combination;
    this.reset();
  }

  reset() {
    // reset lock state here
    this.status = 'LOCKED';
    this.digitsEntered = 0;
    this.failed = false;
  }

  enterDigit(digit) {
    // set this.status depending on state of the lock
    if (this.status === 'LOCKED') {
      this.status = '';
    }
    this.status += `${digit}`;

    if (this.combination[this.digitsEntered] !== digit) {
      this.failed = true;
    }
    this.digitsEntered++;

    if (this.digitsEntered === this.combination.length) {
      this.status = this.failed ? 'ERROR' : 'OPEN';
    }
  }
}
```
