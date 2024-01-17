import { FC } from 'react';
import { Product } from '../../api/products';
import ProductItem from '../ProductItem';

import './styles.scss';

interface Props {
  type: 'inventory' | 'basket';
  products: Product[];
  selectedIds: number[];
  onSingleSelected: (id: number) => void;
  onToggleSelected: (id: number) => void;
}

const ProductList: FC<Props> = ({
  type,
  products,
  selectedIds,
  onSingleSelected,
  onToggleSelected
}) => (
  <div className='list'>
    {products.length ? (
      products.map((product) => (
        <ProductItem
          key={product.id}
          type={type}
          title={product.title}
          checked={selectedIds.includes(product.id)}
          onSingleSelect={() => onSingleSelected(product.id)}
          onProductToggle={() => onToggleSelected(product.id)}
        />
      ))
    ) : (
      <div className='no-products-msg'>No products added</div>
    )}
  </div>
);

export default ProductList;
