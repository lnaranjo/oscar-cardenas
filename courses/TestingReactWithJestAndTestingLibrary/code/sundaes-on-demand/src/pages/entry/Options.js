import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../../commons/AlertBanner';
import { priceItems } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function Options({ optionType = 'scoops' }) {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  const [orderDetails, updateItemCount] = useOrderDetails();

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

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent
      key={name}
      name={name}
      imagePath={imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>${priceItems[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
