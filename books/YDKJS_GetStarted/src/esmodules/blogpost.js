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
