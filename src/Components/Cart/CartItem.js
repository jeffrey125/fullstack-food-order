import classes from './CartItem.module.css';

const CartItem = props => {
  const price = `₱${props.price.toFixed(2)}`;

  // Edit food or Summary
  const buttonOrSummary =
    props.buttonOrSummary || props.showForm ? (
      <div>
        <h3>₱ {`${(+props.price * +props.amount).toFixed(2)}`}</h3>
      </div>
    ) : (
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    );

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>

      {buttonOrSummary}
    </li>
  );
};

export default CartItem;
