import { createContext, useReducer } from "react";
import logger from "use-reducer-logger";
import * as actions from '../constants/CartConst';

export const Store = createContext();

const initState = {
  cart: {
    cartItems: [],
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    //add item
    case actions.CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };

    case actions.CART_DELETE_ITEM:
      const updatedCart = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
      return { ...state, cart: { ...state.cart, cartItems: updatedCart } };

    // {
    //   const cartItems = state.cart.cartItems.filter(
    //     (item) => item._id !== action.payload._id
    //   );
    //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }
    default:
      return state;

  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(logger(reducer), initState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}