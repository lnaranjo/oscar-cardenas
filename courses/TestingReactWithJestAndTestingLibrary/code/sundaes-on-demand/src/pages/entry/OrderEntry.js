import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Button from 'react-bootstrap/Button';
import { phases } from '../../constants';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  // disable button if there are not any scoops in order
  const orderDisabled = orderDetails.totals.scoops === '$0.00';

  return (
    <div>
      <h1>Design your Sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <br />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        disabled={orderDisabled}
        onClick={() => setOrderPhase(phases.REVIEW)}
      >
        Order sundae!
      </Button>
    </div>
  );
}
