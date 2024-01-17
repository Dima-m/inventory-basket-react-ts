import { Product } from '../api/products';

export const actions = {
  setInventoryItems: 'SET_INVENTORY_ITEMS',
  addSelectedToBasket: 'ADD_SELECTED_TO_BASKET',
  addSingleToBasket: 'ADD_SINGLE_TO_BASKET',
  removeSelectedFromBasket: 'REMOVE_SELECTED_FROM_BASKET',
  removeSingleFromBasket: 'REMOVE_SINGLE_FROM_BASKET'
};

export interface State {
  inventory: Product[];
  basket: Product[];
  recentId: number;
  total: number;
}

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case actions.setInventoryItems:
      return {
        ...state,
        inventory: action.payload,
        recentId: action.payload[action.payload.length - 1].id,
        total: action.payload.length + state.basket.length
      };
    case actions.addSelectedToBasket:
      return {
        ...state,
        basket: [
          ...state.basket,
          ...state.inventory.filter((p) => action.payload.ids.includes(p.id))
        ],
        inventory: state.inventory.filter(
          (p) => !action.payload.ids.includes(p.id)
        )
      };
    case actions.addSingleToBasket:
      return {
        ...state,
        basket: [
          ...state.basket,
          ...state.inventory.filter((p) => p.id === action.payload.id)
        ],
        inventory: state.inventory.filter((p) => p.id !== action.payload.id)
      };
    case actions.removeSelectedFromBasket:
      return {
        ...state,
        basket: state.basket.filter((p) => !action.payload.ids.includes(p.id)),
        total: state.total - action.payload.ids.length
      };
    case actions.removeSingleFromBasket:
      return {
        ...state,
        basket: state.basket.filter((p) => p.id !== action.payload.id),
        total: state.total - 1
      };
    default:
      return state;
  }
};

export default reducer;
