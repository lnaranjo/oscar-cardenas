# ES Modules

## Considerations:

- There is no wrapping function to define a module.
- Interactive with another APIs using `export`.
- To use the module only needs import and not use a instance.

### Simple definition of a module

We can define a module with complementary functions and only export the main function for a module.

Let's define the `publication.js` module that exports a function to create a publication:

```javascript
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
```

In order to use the `create` function defined in the `publication.js` module in another module just import it, it is even possible to rename it.

We define the module blogpost.js where the `create` function is imported to extend the functionality of the module, let's see the example:

```javascript
import { create as createPub } from 'publication';

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
```

Now we can extend the function in the main flow of a program by importing the `create` function from the `blogpost` module:

```javascript
import { create as newBlogPost } from 'blogpost.js';

const forAgainstLet = newBlogPost(
  'For and against let',
  'Kyle Simpson',
  'October 27, 2014',
  'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet.print();
```
