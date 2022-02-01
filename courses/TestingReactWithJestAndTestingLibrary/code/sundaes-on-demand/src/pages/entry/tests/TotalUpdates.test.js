import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops changes', async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoop to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoop to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  // add cherries and check subtotals
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  // remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />);

    // find grand total display text
    const grandTotal = screen.getByRole('heading', {
      name: /grand total/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    // find grand total display text
    const grandTotal = screen.getByRole('heading', {
      name: /grand total/i,
    });

    // update vanilla scoope to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and update the grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    // find grand total display text
    const grandTotal = screen.getByRole('heading', {
      name: /grand total/i,
    });

    // update vanilla scoope to 2 and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    // update chocolate scoope to 2 and check grand total
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    // find grand total display text
    const grandTotal = screen.getByRole('heading', {
      name: /grand total/i,
    });

    // update vanilla scoope to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and update the grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');

    // remove one item
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');

    // remove cherries
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');

    // remove the last item
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');
    expect(grandTotal).toHaveTextContent('0.00');
  });
});
