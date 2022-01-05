function Publication(title, author, pubDate) {
  var publicAPI = {
    print() {
      console.log(`
        Title: ${title}
        By: ${author}
        Published: ${pubDate}
      `);
    },
  };

  return publicAPI;
}

function Book(bookDetails) {
  var pub = Publication(
    bookDetails.title,
    bookDetails.author,
    bookDetails.publishedOn
  );

  var publicAPI = {
    print() {
      pub.print();

      console.log(`
        Publisher: ${bookDetails.publisher}
        ISBN: ${bookDetails.ISBN}
      `);
    },
  };

  return publicAPI;
}

function BlogPost(title, author, pubDate, url) {
  var pub = Publication(title, author, pubDate);

  var publicAPI = {
    print() {
      pub.print();
      console.log(url);
    },
  };

  return publicAPI;
}

// instance a new book
const YDKJS = Book({
  title: "You Don't Know JS",
  publishedOn: "June 2014",
  author: "Kyle Simpson",
  publisher: "O'Reilly",
  ISBN: "123456-789",
});

YDKJS.print();

// instance a new blogpost
var forAgainstLet = BlogPost(
  "For and against let",
  "Kyle Simpson",
  "October 27, 2014",
  "https://davidwalsh.name/for-and-against-let"
);

forAgainstLet.print();
