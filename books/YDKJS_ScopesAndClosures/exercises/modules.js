function calculator() {
  var currentTotal = 0;
  var currentVal = '';
  var currentOper = '=';
  var publicAPI = {
    number,
    eq,
    plus() {
      return operator('+');
    },
    minus() {
      return operator('-');
    },
    mult() {
      return operator('*');
    },
    div() {
      return operator('/');
    },
  };
  return publicAPI;
  // ********************
  function number(key) {
    // number key?
    if (/\d/.test(key)) {
      currentVal += key;
      return key;
    }
  }
  function eq() {
    // = key?
    if (currentOper != '=') {
      currentTotal = op(currentTotal, currentOper, Number(currentVal));
      currentOper = '=';
      currentVal = '';
      return formatTotal(currentTotal);
    }
    return '';
  }
  function operator(key) {
    // multiple operations in a series?
    if (currentOper != '=' && currentVal != '') {
      // implied '=' keypress
      eq();
    } else if (currentVal != '') {
      currentTotal = Number(currentVal);
    }
    currentOper = key;
    currentVal = '';
    return key;
  }
  function op(val1, oper, val2) {
    var ops = {
      // NOTE: using arrow functions
      // only for brevity in the book
      '+': (v1, v2) => v1 + v2,
      '-': (v1, v2) => v1 - v2,
      '*': (v1, v2) => v1 * v2,
      '/': (v1, v2) => v1 / v2,
    };
    return ops[oper](val1, val2);
  }
}

var calc = calculator();
useCalc(calc, '4+3='); // 4+3=7
useCalc(calc, '+9='); // +9=16
useCalc(calc, '*8='); // *5=128
useCalc(calc, '7*2*3='); // 7*2*3=42
useCalc(calc, '1/0='); // 1/0=ERR
useCalc(calc, '+3='); // +3=ERR
useCalc(calc, '51='); // 51
