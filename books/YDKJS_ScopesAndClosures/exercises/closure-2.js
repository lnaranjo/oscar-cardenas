function toggle(...vals) {
  var unset = {};
  var cur = unset;
  return function next() {
    // save previous value back at
    // the end of the list
    if (cur != unset) {
      vals.push(cur);
    }
    cur = vals.shift();
    return cur;
  };
}

const hello = toggle('hello');
const onOff = toggle('on', 'off');
const speed = toggle('slow', 'medium', 'fast');

hello(); // "hello"
hello(); // "hello"
onOff(); // "on"
onOff(); // "off"
onOff(); // "on"
speed(); // "slow"
speed(); // "medium"
speed(); // "fast"
speed(); // "slow"
