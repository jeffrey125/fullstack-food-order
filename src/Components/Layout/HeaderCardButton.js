import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCardButton = props => {
  const [btnBump, setBtnBump] = useState(false);
  const ctx = useContext(CartContext);

  const numberOfCartItems = ctx.items.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`;

  // Button bump animation
  useEffect(() => {
    if (ctx.items.length === 0) return;

    setBtnBump(true);

    const bumpAnimation = setTimeout(() => {
      setBtnBump(false);
    }, 200);

    return () => clearTimeout(bumpAnimation);
  }, [ctx.items]);

  return (
    <button onClick={props.onShowModal} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.cartTitle}>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
