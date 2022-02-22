# Advanced Shared Memory

## Atomic Methods for Coordination

As far as prior art goes, these methods are modeled after a feature available in the Linux kernel called the futex, which is short for fast userspace mutex. Mutex itself is short for mutual exclusion, which is when a single thread of execution gets exclusive access to a particular piece of data. A mutex can also be referred to as a lock, where one thread locks access to the data, does its thing, and then unlocks access, allowing another thread to then touch the data.

- **Atomics.wait()**: This method first checks typedArray to see if the value at index is equal to value. If it is not, the function returns the value not-equal.

```javascript
const status = Atomics.wait(typedArray, index, value, (timeout = Infinity));
```

- **Atomics.notify()**: This method attempts to awaken other threads that have called Atomics.wait() on the same typedArray and at the same index. If any other threads are currently frozen, then they will wake up.

```javascript
const awaken = Atomics.notify(typedArray, index, (count = Infinity));
```

- **Atomics.waitAsync()**: This method is essentially a less-performant, nonblocking version of Atomics.wait() that returns a promise which resolves the status of the wait operation.

```javascript
const promise = Atomics.waitAsync(
  typedArray,
  index,
  value,
  (timeout = Infinity)
);
```

## Timing and Nondeterminism

Threads are woken up in FIFO (first in, first out) order, meaning the first thread that called Atomics.wait() is the first to be woken up, the second to call is the second to be woken up, and so on.
