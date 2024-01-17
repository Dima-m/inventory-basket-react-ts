import { FC, SyntheticEvent } from 'react';
import Checkbox from '../Checkbox';
import Button from '../Button';

import './styles.scss';

interface Props {
  title: string;
  type: 'inventory' | 'basket';
  checked: boolean;
  onProductToggle: VoidFunction;
  onSingleSelect: VoidFunction;
}

const ProductItem: FC<Props> = ({
  title,
  type,
  checked,
  onProductToggle,
  onSingleSelect
}) => {
  const handleRowSelect = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    onProductToggle();
  };

  return (
    <div
      data-testid='product-item'
      className={`item ${checked ? 'checked' : ''}`}
      onClick={handleRowSelect}>
      <Checkbox label={title} checked={checked} onChange={onProductToggle} />
      <Button
        text={type === 'basket' ? 'Delete' : 'Add'}
        danger={type === 'basket'}
        onClick={onSingleSelect}
      />
    </div>
  );
};

export default ProductItem;
