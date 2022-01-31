import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';

export default function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation pages does not need a provider */}
    </Container>
  );
}
