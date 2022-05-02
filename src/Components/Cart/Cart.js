import React, { useContext } from 'react';
import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  const ctx = useContext(CartContext);

  const hasItems = ctx.items.length > 0;
  const totalAmount = `${ctx.totalAmount.toFixed(2)}`;

  const cartItemRemovehandler = id => {
    console.log(id);
  };
  const cartItemAddHandler = item => {
    console.log(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctx.items.map(item => {
        return (
          <CartItem
            key={item.key}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemovehandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onHideModal={props.onHideModal}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideModal}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
