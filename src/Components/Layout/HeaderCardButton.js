import React, { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCardButton = props => {
  const ctx = useContext(CartContext);

  const numberOfCartItems = ctx.items.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <button onClick={props.onShowModal} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
