// registers service worker and defines scope.
navigator.serviceWorker.register('/sw.js', {
  scope: '/',
});

// listens for a controllerchange event.
navigator.serviceWorker.oncontrollerchange = () => {
  console.log('controller change');
};

// function to initiate request
async function makeRequest() {
  const result = await fetch('/data.json');
  const payload = await result.json();
  console.log(payload);
}
