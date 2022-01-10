// What would it take to make it asynchronous

const students = [
  { name: 'Mary', score: 90, school: 'East' },
  { name: 'James', score: 100, school: 'East' },
  { name: 'Steve', score: 40, school: 'East' },
  { name: 'Gabe', score: 90, school: 'West' },
  { name: 'Rachel', score: 85, school: 'East' },
  { name: 'Rochelle', score: 95, school: 'West' },
  { name: 'Lynette', score: 75, school: 'East' },
];

function processStudents(items = [], callback) {
  for (let item of items) {
    if (item.school.toLowerCase() === 'east') {
      typeof callback === 'function' && callback(item);
    }
  }
}

console.log('Before determineTotal');

function determineTotal() {
  let total = 0;
  let count = 0;

  processStudents(students, function ({ score }) {
    total += score;
    count++;
  });

  console.log('Total Score: ' + total + ' - Total Count: ' + count);
}

setTimeout(determineTotal, 0);

console.log('End of code');
