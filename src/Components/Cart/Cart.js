import React, { useContext } from 'react';
import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  const ctx = useContext(CartContext);
  console.log(ctx);

  const hasItems = ctx.items.length > 0;
  const totalAmount = `${ctx.totalAmount.toFixed(2)}`;

  const cartItemRemovehandler = id => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = item => {
    ctx.addItem({ ...item, amount: 1 });
  };

  // Cart Content for the Cart Items
  const cartContent =
    ctx.items.length === 0 ? (
      <h2 className={classes['cart-items--error']}>
        Please Add an Item on The Menu 🍔
      </h2>
    ) : (
      ctx.items.map(item => {
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
      })
    );

  // Cart Items
  const cartItems = <ul className={classes['cart-items']}>{cartContent}</ul>;

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
