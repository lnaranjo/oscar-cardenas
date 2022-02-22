self.onmessage = ({ data: { buffer, name } }) => {
  const view = new Int32Array(buffer);
  console.log(`Worker ${name} started`);

  // wait on 0th entry in buffer, assuming initial value of 0, for up to 1 second
  const result = Atomics.wait(view, 0, 0, 1000);
  console.log(`Worker ${name} awoken with ${result}`);
};
