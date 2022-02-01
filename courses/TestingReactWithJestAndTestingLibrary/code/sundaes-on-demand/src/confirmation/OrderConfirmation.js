import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { phases } from '../constants';
import { useOrderDetails } from '../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [error, setError] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    fetch('http://localhost:3030/order', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then(({ orderNumber }) => !isCancelled && setOrderNumber(orderNumber))
      .catch(() => !isCancelled && setError(true));

    return () => {
      isCancelled = true;
    };
  }, []);

  function handleClick() {
    // clear order details
    resetOrder();

    // send back to order page
    setOrderPhase(phases.IN_PROGRESS);
  }

  if (error) {
    return <AlertBanner message={null} variant={null} />;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>
        Your order number is: <strong>{orderNumber}</strong>
      </p>
      <p style={{ fontSize: '0.75rem' }}>
        As per our terms and conditions, nothing will happen now
      </p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
}
