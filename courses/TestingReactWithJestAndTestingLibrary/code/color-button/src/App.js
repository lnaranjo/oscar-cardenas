import { useState } from 'react';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [color, setColor] = useState('MediumVioletRed');
  const [isDisabled, setIsDisabled] = useState(false);
  const newColor =
    (color === 'MediumVioletRed' && 'MidnightBlue') || 'MediumVioletRed';

  return (
    <div>
      <button
        style={{ backgroundColor: (isDisabled && 'gray') || color }}
        onClick={() => setColor(newColor)}
        disabled={isDisabled}
      >
        Change to {replaceCamelWithSpaces(newColor)}
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
