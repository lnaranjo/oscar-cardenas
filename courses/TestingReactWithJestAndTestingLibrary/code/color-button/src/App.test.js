import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  // check that button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  // check that button checkbox starts out checked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('checkbox disables button on first click and enables on second click', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('disabled button has gray background and reverts to red', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: 'Change to blue' });

  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');

  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: red');
});

test('clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: 'Change to blue' });

  // change button to blue
  fireEvent.click(button);

  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');

  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: blue');
});

describe('spaces before cammed-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('works with multiple capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
