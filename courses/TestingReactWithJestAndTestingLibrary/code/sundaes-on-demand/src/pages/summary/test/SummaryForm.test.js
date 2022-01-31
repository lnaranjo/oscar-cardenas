import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  const confirmationButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  expect(confirmationButton).toBeDisabled();
});

test('checkbox disables button on first click and enables on second click', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const confirmationButton = screen.getByRole('button', {
    name: /confirm order/i,
  });

  userEvent.click(checkbox);
  expect(confirmationButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmationButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  // starts out hidden
  const nullPopover = screen.queryByText(/no ice cream actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // appeears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.queryByText(/no ice cream actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream actually be delivered/i)
  );
});
