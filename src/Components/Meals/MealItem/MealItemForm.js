import React, { useState, useContext } from 'react';
import classes from './MealItemForm.module.css';

import Input from '../../UI/Input';
import CartContext from '../../../store/cart-context';

const MealItemForm = props => {
  const [foodAmount, setFoodAmount] = useState(1);
  const ctx = useContext(CartContext);

  const inputDataType = {
    id: 'foodAmount_' + props.id,
    type: 'number',
    min: '1',
    max: '5',
    step: '1',
    value: foodAmount,
    onChange: function (e) {
      setFoodAmount(e.target.value);
    },
  };

  const submitHandler = e => {
    e.preventDefault();

    if (foodAmount === 0 || foodAmount < 1 || foodAmount > 5) return;

    ctx.addItem({
      amount: +foodAmount,
      key: new Date().getTime(),
      ...props.mealData,
    });

    setFoodAmount(1);
  };

  // Classes to import on Input component
  const inputClass = {
    inputBox: classes.input,
    label: classes['input-label'],
    input: classes['input-input--box'],
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label="Amount" type={inputDataType} className={inputClass}></Input>
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
