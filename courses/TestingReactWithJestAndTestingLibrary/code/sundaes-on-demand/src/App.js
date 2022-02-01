import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './confirmation/OrderConfirmation';

import { OrderDetailsProvider } from './contexts/OrderDetails';
import { phases } from './constants';

export default function App() {
  const [orderPhase, setOrderPhase] = useState('IN_PROGRESS');

  let Component = OrderEntry;
  switch (orderPhase) {
    case phases.REVIEW:
      Component = OrderSummary;
      break;
    case phases.COMPLETED:
      Component = OrderConfirmation;
      break;
    case phases.IN_PROGRESS:
    default:
      Component = OrderEntry;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary page and entry page need provider */}
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
      {/* confirmation pages does not need a provider */}
    </Container>
  );
}
