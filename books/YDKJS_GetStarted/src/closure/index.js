function greeting(msg) {
  return function who(name) {
    console.log(`${msg}, ${name}`);
  };
}

const hello = greeting('Hello');
const howdy = hello('Oscar');
howdy; // Hello, Oscar

hello('Luis');
// Hello, Luis

// define a counter with a closure
function counter(step = 1) {
  let count = 0;
  return function increaseCount() {
    count += step;
    return count;
  };
}

const incBy2 = counter(2);
incBy2(); // 2
incBy2(); // 4
incBy2(); // 6
incBy2(); // 8
incBy2(); // 10

//define a customer fetcher with a closure
function getSomeData(url) {
  fetcher(url, function onResponse(data) {
    console.log({ data });
  });
}

getSomeData('https://unosquare.com'); // { data: [SOME_DATA_HERE] }

// using this keyword
function classroom(teacher) {
  return function study() {
    console.log(`${teacher} says to study ${this.topic}`);
  };
}

const assignment = classroom('Oscar');
const homework = {
  topic: 'JS',
  assignment,
};

homework.assignment(); // Oscar says study JS

// using `call` method
const anotherHomework = {
  topic: 'Math',
};
assignment.call(anotherHomework); // Oscar says study Math
