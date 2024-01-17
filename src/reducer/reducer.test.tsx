import { beforeEach, describe, it, expect } from 'vitest';

import reducer, { actions, State } from '.';

let initialState: State;

describe('AppReducer', () => {
  beforeEach(() => {
    initialState = {
      inventory: [],
      basket: [],
      recentId: 0,
      total: 0
    };
  });

  it('should set inventory items', () => {
    const action = {
      type: actions.setInventoryItems,
      payload: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' }
      ]
    };

    const newState = reducer(initialState, action);

    expect(newState.inventory).toEqual(action.payload);
    expect(newState.total).toBe(action.payload.length);
  });

  it('should add selected items to basket', () => {
    initialState = {
      inventory: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' }
      ],
      basket: [],
      recentId: 3,
      total: 3
    };

    const action = {
      type: actions.addSelectedToBasket,
      payload: {
        ids: [1, 3]
      }
    };

    const newState = reducer(initialState, action);

    expect(newState.basket).toEqual([
      { id: 1, title: 'Item 1' },
      { id: 3, title: 'Item 3' }
    ]);

    expect(newState.inventory).toEqual([{ id: 2, title: 'Item 2' }]);
  });

  it('should add a single item to basket', () => {
    initialState = {
      inventory: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' }
      ],
      basket: [],
      recentId: 3,
      total: 3
    };

    const action = {
      type: actions.addSingleToBasket,
      payload: {
        id: 2
      }
    };

    const newState = reducer(initialState, action);

    expect(newState.basket).toEqual([{ id: 2, title: 'Item 2' }]);

    expect(newState.inventory).toEqual([
      { id: 1, title: 'Item 1' },
      { id: 3, title: 'Item 3' }
    ]);
  });

  it('should remove selected items from basket', () => {
    initialState = {
      inventory: [{ id: 2, title: 'Item 2' }],
      basket: [
        { id: 1, title: 'Item 1' },
        { id: 3, title: 'Item 3' },
        { id: 4, title: 'Item 4' }
      ],
      recentId: 4,
      total: 4
    };

    const action = {
      type: actions.removeSelectedFromBasket,
      payload: {
        ids: [1, 3]
      }
    };

    const newState = reducer(initialState, action);
    expect(newState.basket).toEqual([{ id: 4, title: 'Item 4' }]);
    expect(newState.total).toBe(2);
  });

  it('should remove a single item from basket', () => {
    initialState = {
      inventory: [{ id: 4, title: 'Item 4' }],
      basket: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' }
      ],
      recentId: 0,
      total: 4
    };

    const action = {
      type: actions.removeSingleFromBasket,
      payload: {
        id: 2
      }
    };

    const newState = reducer(initialState, action);

    expect(newState.basket).toEqual([
      { id: 1, title: 'Item 1' },
      { id: 3, title: 'Item 3' }
    ]);
    expect(newState.total).toBe(3);
  });
});
