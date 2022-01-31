import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  function handleChange(event) {
    updateItemCount(name, event.target.value);
  }

  return (
    <Col xs={12} sm={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        alt={`${name} scoop`}
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
