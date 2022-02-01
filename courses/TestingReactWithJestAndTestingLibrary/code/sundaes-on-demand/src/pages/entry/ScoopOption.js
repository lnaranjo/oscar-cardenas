import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(true);

  function handleChange(event) {
    const currentValue = event.target.value;

    if (!currentValue.length) {
      return updateItemCount(name, 0);
    }

    // make sure we are using a number and not a string to validate
    const currentValueFloat = parseFloat(currentValue);

    // check the value is valid
    const valueIsValid =
      currentValueFloat >= 0 &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === +currentValue;

    setIsValid(valueIsValid);

    valueIsValid && updateItemCount(name, currentValue);
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
            isInvalid={!isValid}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
