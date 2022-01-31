import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../../commons/AlertBanner';

export default function Options({ optionType = 'scoops' }) {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3030/${optionType}`)
      .then((response) => response.json())
      .then(setItems)
      .catch(() => setHasError(!hasError));
  }, [optionType, hasError]);

  if (hasError) {
    return <AlertBanner />;
  }

  const ItemComponent =
    (optionType === 'scoops' && ScoopOption) || ToppingOption;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}
