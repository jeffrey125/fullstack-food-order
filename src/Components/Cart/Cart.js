import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  const [orderSummary, setOrderSummary] = useState(false);
  const [fadeInSummary, setFadeInSummary] = useState(false);
  const [fadeInItems, setFadeInItems] = useState(false);

  const ctx = useContext(CartContext);

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
            showForm={props.showForm}
            key={item.key}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemovehandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            buttonOrSummary={orderSummary}
          />
        );
      })
    );

  // Submission Handler on Food Order
  // State for Food Summary

  const orderSummaryHandler = () => {
    setOrderSummary(true);

    // Animation Reset
    setFadeInSummary(true);
    setTimeout(() => {
      setFadeInSummary(false);
    }, 200);
  };

  const backSummaryHandler = () => {
    setOrderSummary(false);

    // Animation reset
    setFadeInItems(true);
    setTimeout(() => {
      setFadeInItems(false);
    }, 200);
  };

  // Conditional Cart Fade-In classes
  const cartSummaryClasses = fadeInSummary
    ? `${classes['cart-summary']} ${classes['fade-in']}`
    : classes['cart-summary'];

  const cartItemsClasses = fadeInItems
    ? `${classes['cart-items']} ${classes['fade-in']}`
    : classes['cart-items'];

  // Cart Items conditional for summary
  const cardContent =
    orderSummary || props.showForm ? (
      <ul className={cartSummaryClasses}>
        <h1>Meal Order Summary</h1>
        {cartContent}
      </ul>
    ) : (
      <ul className={cartItemsClasses}>{cartContent}</ul>
    );

  // Back or Close BTN Conditional
  const closeOrBack = orderSummary ? (
    <button className={classes['button--alt']} onClick={backSummaryHandler}>
      Back
    </button>
  ) : (
    <button className={classes['button--alt']} onClick={props.onHideModal}>
      Close
    </button>
  );

  // Show Food Order
  const showFoodOrderFormHandler = () => {
    setOrderSummary(false);
    props.onShowForm();
    props.onHideModal();
  };

  // Conditional for cartFlex if Items are 1
  const cartFlexClass = ctx.items.length <= 2 ? '' : classes.cartFlex;

  return (
    <Modal onHideModal={props.onHideModal} cartFlex={cartFlexClass}>
      {cardContent}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₱ {totalAmount}</span>
      </div>

      <div className={classes.actions}>
        {closeOrBack}
        {hasItems && !props.showForm ? (
          <button
            className={classes.button}
            onClick={
              orderSummary ? showFoodOrderFormHandler : orderSummaryHandler
            }
          >
            Next
          </button>
        ) : null}
      </div>
    </Modal>
  );
};

export default Cart;
