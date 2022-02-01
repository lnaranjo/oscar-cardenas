import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopArr = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArr.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  let toppingList = null;
  const hasToppings = orderDetails.toppings.size > 0;
  if (hasToppings) {
    const toppingArr = Array.from(orderDetails.toppings.entries());
    toppingList = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>
          {toppingArr.map(([key, value]) => (
            <li key={key}> {key} </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingList}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
