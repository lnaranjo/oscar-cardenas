function range(start, end) {
  if (!end) {
    return function getEnd(end) {
      return getRange(start, end);
    };
  } else {
    return getRange(start, end >>> 0);
  }

  function getRange(start, end) {
    let ret = [];
    for (let i = start; i <= end; i++) {
      ret.push(i);
    }
    return ret;
  }
}

console.log(range(3, 3)); // [3]
console.log(range(3, 8)); // [3,4,5,6,7,8]
console.log(range(3, 0)); // []
