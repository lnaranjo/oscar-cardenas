import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({ message, variant }) {
  // defines message custom type
  const alertMessage =
    message || 'An unexpected error ocurred. Please try again later.';

  // defines variant type
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
}
