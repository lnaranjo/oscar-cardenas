const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// single form to iterate an array
for (let num of nums) {
  console.log(num);
}

// iteration a Map data structure
for (let [index, num] of nums.entries()) {
  console.log(`[${index}]: ${num}`);
}
