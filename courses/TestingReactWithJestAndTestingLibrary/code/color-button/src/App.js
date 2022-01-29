import { useState } from 'react';

function App() {
  const [color, setColor] = useState('red');
  const [isDisabled, setIsDisabled] = useState(false);
  const newColor = (color === 'red' && 'blue') || 'red';

  return (
    <div>
      <button
        style={{ backgroundColor: color }}
        onClick={() => setColor(newColor)}
        disabled={isDisabled}
      >
        Change to {newColor}
      </button>

      <input
        type="checkbox"
        aria-checked={isDisabled}
        defaultChecked={isDisabled}
        id="disable-button-checkbox"
        onChange={(e) => setIsDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
