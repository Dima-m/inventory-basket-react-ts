import { beforeEach, describe, it, expect, vi } from 'vitest';

import { render, fireEvent } from '@testing-library/react';
import { actions } from '../../reducer';
import { AppContext } from '../../App';
import Basket from '.';

describe('Basket', () => {
  const mockState = {
    basket: [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' }
    ]
  };
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Basket component correctly', () => {
    const { getByText } = render(
      <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <Basket />
      </AppContext.Provider>
    );

    expect(getByText('Basket')).toBeInTheDocument();
    expect(getByText('Delete Selected')).toBeInTheDocument();
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
  });

  it('calls dispatch with correct parameters when a product is removed', () => {
    const { getAllByText } = render(
      <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <Basket />
      </AppContext.Provider>
    );

    const removeProductButton = getAllByText('Delete');
    fireEvent.click(removeProductButton[0]);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.removeSingleFromBasket,
      payload: { id: 1 }
    });
  });
});
