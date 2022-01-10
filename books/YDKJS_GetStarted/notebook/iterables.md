# Iterables

## Considerations:

- This means a single iterable could be consumed more than once.
- Each time, a new iterator instance would be created and used.

## Examples:

#### Iterator for single array

```javascript
const arr = [10, 20, 30];

for (let item of arr) {
  console.log({ item });
}
```

#### Itearator for Map data structure

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let [index, num] of arr.entries()) {
  console.log(`[${index}]: ${num}`);
}
```
