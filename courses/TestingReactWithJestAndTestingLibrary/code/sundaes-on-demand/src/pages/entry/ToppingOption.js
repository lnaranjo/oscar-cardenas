import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  function handleUpdate(event) {
    updateItemCount(name, (event.target.checked && 1) || 0);
  }
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        alt={`${name} topping`}
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleUpdate} label={name} />
      </Form.Group>
    </Col>
  );
}
