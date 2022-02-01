import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { priceItems } from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * priceItems[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopSubtotal + toppingSubtotal;
    setTotals({
      grandTotal: formatCurrency(grandTotal),
      scoops: formatCurrency(scoopSubtotal),
      toppings: formatCurrency(toppingSubtotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    // getter: object containing option counts for scoops and toppings, subtotals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}

// create a custom hook to check whether we are inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context)
    throw new Error(
      'useOrderDetails must be used within a OrderDetailProvider'
    );

  return context;
}
