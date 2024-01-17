import { useContext, useState } from 'react';

import { actions } from '../../reducer';
import { AppContext, AppContextType } from '../../App';
import ProductList from '../../components/ProductList';
import Button from '../../components/Button';

import './styles.scss';

const Basket = () => {
  const { state, dispatch } = useContext(AppContext) as AppContextType;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const onRemoveSelected = () => {
    dispatch({
      type: actions.removeSelectedFromBasket,
      payload: { ids: selectedIds }
    });
    setSelectedIds([]);
  };

  const onRemoveSingle = (id: number) => {
    dispatch({ type: actions.removeSingleFromBasket, payload: { id } });
  };

  const onToggleSelected = (id: number) => {
    setSelectedIds((selected) =>
      selected.includes(id)
        ? selected.filter((id) => id !== id)
        : [...selected, id]
    );
  };

  return (
    <div className='basket-container'>
      <div className='header'>
        <div className='title'>Basket</div>
        <Button
          danger
          text='Delete Selected'
          disabled={!selectedIds.length}
          onClick={onRemoveSelected}
        />
      </div>
      <ProductList
        type='basket'
        products={state.basket}
        selectedIds={selectedIds}
        onSingleSelected={onRemoveSingle}
        onToggleSelected={onToggleSelected}
      />
    </div>
  );
};

export default Basket;
