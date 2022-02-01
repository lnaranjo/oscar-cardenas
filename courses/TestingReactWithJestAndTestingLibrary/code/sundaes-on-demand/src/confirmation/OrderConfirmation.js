import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../contexts/OrderDetails';
import { phases } from '../constants';

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3030/order', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then(({ orderNumber }) => setOrderNumber(orderNumber))
      .then(console.error);
  }, []);

  function handleClick() {
    // clear order details
    resetOrder();

    // send back to order page
    setOrderPhase(phases.IN_PROGRESS);
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
