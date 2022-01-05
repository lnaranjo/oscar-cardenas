# ES Modules

## Considerations:

- There is no wrapping function to define a module.
- Interactive with another APIs using `export`.
- To use the module only needs import and not use a instance.

## Examples:

```javascript
// publication.js
function printDetails(title, author, pubDate) {
  console.log(`
      Title: ${title}
      Author: ${author}
      Published: ${pubDate}
    `);
}

export function create(title, author, pubDate) {
  return {
    print() {
      printDetails(title, author, pubDate);
    },
  };
}

// blogpost.js
import { create as createPub } from "publication";

function printDetails(pub, url) {
  pub.print();
  console.log(url);
}

export function create(title, author, pubDate, url) {
  const pub = createPub(title, author, pubDate);

  return {
    print() {
      printDetails(pub, url);
    },
  };
}

// main.js
import { create as newBlogPost } from "blogpost.js";

const forAgainstLet = newBlogPost(
  "For and against let",
  "Kyle Simpson",
  "October 27, 2014",
  "https://davidwalsh.name/for-and-against-let"
);

forAgainstLet.print();
```
