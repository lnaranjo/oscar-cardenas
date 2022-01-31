import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

export default function Options({ optionType = 'scoops' }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/${optionType}`)
      .then((response) => response.json())
      .then(setItems)
      .catch(console.error);
  }, [optionType]);

  // TODO: replace null with ToppingOption when available
  const ItemComponent =
    (optionType === 'scoops' && ScoopOption) || ToppingOption;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}
