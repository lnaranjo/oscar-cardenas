import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { phases } from '../../constants';

export default function SummaryFrom({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    setOrderPhase(phases.COMPLETED);
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      {'I gree to '}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          label={checkboxLabel}
          onChange={(e) => setTcChecked(e.target.checked)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
