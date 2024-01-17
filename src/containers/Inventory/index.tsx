import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchSingleProduct } from '../../api/products';
import { actions } from '../../reducer';
import { AppContext, AppContextType } from '../../App';
import ProductList from '../../components/ProductList';
import Button from '../../components/Button';

import './styles.scss';

const Inventory = () => {
  const {
    isLoading,
    data: newProduct,
    refetch
  } = useQuery({
    queryKey: ['newProduct'],
    queryFn: () => fetchSingleProduct(state.recentId + 1),
    enabled: false
  });

  const { state, dispatch } = useContext(AppContext) as AppContextType;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!isLoading && newProduct) {
      dispatch({
        type: actions.setInventoryItems,
        payload: [...state.inventory, newProduct]
      });
    }
  }, [newProduct]);

  const onAddSelected = () => {
    dispatch({
      type: actions.addSelectedToBasket,
      payload: { ids: selectedIds }
    });
    setSelectedIds([]);
  };

  const onAddSingle = (id: number) => {
    dispatch({ type: actions.addSingleToBasket, payload: { id } });
    setSelectedIds([]);
  };

  const onToggleSelected = (id: number) => {
    setSelectedIds((selected) =>
      selected.includes(id)
        ? selected.filter((id) => id !== id)
        : [...selected, id]
    );
  };

  return (
    <div className='inventory-container'>
      <div className='header'>
        <div className='title'>Inventory</div>
        <div className='buttons'>
          <Button outlined text='New' onClick={refetch} />
          <Button
            text='Add Selected'
            disabled={!selectedIds.length}
            onClick={onAddSelected}
          />
        </div>
      </div>
      <ProductList
        type='inventory'
        products={state.inventory}
        selectedIds={selectedIds}
        onSingleSelected={onAddSingle}
        onToggleSelected={onToggleSelected}
      />
    </div>
  );
};

export default Inventory;
