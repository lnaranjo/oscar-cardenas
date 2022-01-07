# Exercise 1

### Objective

Use an input to enter a word an return information about request to the `WordnikAPI` using JS promises

### Resolution

> First, whe need declare global information about the keys, baseURL

```javascript
const wordnikWord = 'http://api.wordnik.com/v4/word.json/';
const apiKey = '2efe06dd56a60633b30010e4d970da03b55279db9896d7127';
```

> Second, it's necessary define the promise will be used to request data:

```javascript
const getValue = function (word = '') {
  return fetch(`${wordnikWord}/${word}/scrabbleScore?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => data.value);
};
```

> Third, it's necessary add a trigger to listen the events

```javascript
const field = document.querySelector('#word');
const btn = document.querySelector('#submitBtn');
const results = document.querySelector('#results');

// when user makes a click in button,
btn.addEventListener('click', function (e) {
  // request promise function
  getValue(field.value).then((value) => {
    results.innerHTML = scrabbleVal; // insert inner result container
    window.scrabbleVal = scrabbleVal; // store value in window
  });
});
```
