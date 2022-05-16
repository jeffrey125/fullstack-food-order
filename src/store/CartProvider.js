import React, { useReducer, useEffect } from 'react';

import CartContext from './cart-context';
import CartReducer, { cartStateInit, defaultCartState } from './CartReducer';

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState,
    cartStateInit
  );

  useEffect(() => {
    sessionStorage.setItem('foodOrder', JSON.stringify(cartState.items));
    sessionStorage.setItem(
      'totalAmount',
      JSON.stringify(cartState.totalAmount)
    );
  }, [cartState.items, cartState.totalAmount]);

  const addItemToCartHandler = item =>
    dispatchCartAction({ type: 'ADD', item });

  const removeItemFromCartHandler = id =>
    dispatchCartAction({ type: 'REMOVE', id });

  const resetCartHandler = () => {
    dispatchCartAction({ type: `SUBMIT` });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    reset: resetCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
