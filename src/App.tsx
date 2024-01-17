import { Dispatch, createContext, useEffect, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';

import reducer, { State, actions } from './reducer';
import { fetchProducts } from './api/products';
import Inventory from './containers/Inventory';
import Basket from './containers/Basket';

import './App.scss';

export const AppContext = createContext({});
export type AppContextType = {
  state: State;
  dispatch: Dispatch<any>;
};

const App = () => {
  const {
    isLoading,
    error,
    data: products
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    select: (data) => data.products
  });

  const [state, dispatch] = useReducer(reducer, {
    inventory: [],
    basket: [],
    recentId: null,
    total: 0
  });

  useEffect(() => {
    if (!isLoading && products?.length) {
      dispatch({ type: actions.setInventoryItems, payload: products });
    }
  }, [products]);

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className='app-container'>
      <div className='content'>
        <AppContext.Provider value={{ state, dispatch }}>
          <Inventory />
          <Basket />
        </AppContext.Provider>
      </div>
      <div className='total'>Total: {state.total}</div>
    </div>
  );
};

export default App;
