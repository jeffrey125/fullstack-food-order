import React from 'react';
import classes from './MealItemForm.module.css';

import Input from '../../UI/Input';

const MealItemForm = props => {
  const inputDataType = {
    id: 'foodAmount_' + props.id,
    type: 'number',
    min: '1',
    max: '5',
    step: '1',
    defaultValue: '1',
  };

  return (
    <form className={classes.form}>
      <Input label="Amount" type={inputDataType}></Input>
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
