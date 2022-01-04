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
