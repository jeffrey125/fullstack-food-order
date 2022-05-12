import React, { useState } from 'react';
import classes from './OrderForm.module.css';

import useInput from '../../hooks/use-input';
import OrderFormInput from './OrderFormInput';
import Card from '../UI/Card';

const OrderForm = props => {
  const [foodOrderIsValid, setFoodOrderIsValid] = useState(false);

  const inputNotEmpty = value => value.trim().length !== 0;

  // Input for First Name
  const {
    value: firstNameValue,
    isValueValid: firstNameValid,
    hasError: firstNameError,
    valueChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstNameBlur,
    valueReset: firstNameReset,
  } = useInput(inputNotEmpty);

  const fnameDataType = {
    id: 'first-name',
    type: 'text',
    value: firstNameValue,
    onChange: firstNameChangeHandler,
    onBlur: firstNameBlur,
  };

  // Input for Last Name
  const {
    value: lastNameValue,
    isValueValid: lastNameValid,
    hasError: lastNameError,
    valueChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastNameBlur,
    valueReset: lastNameReset,
  } = useInput(inputNotEmpty);

  const lnameDataType = {
    id: 'last-name',
    type: 'text',
    value: lastNameValue,
    onChange: lastNameChangeHandler,
    onBlur: lastNameBlur,
  };

  // Input for Address (Get data from backend)

  // Input for contact number

  // Send POST HTTP

  // Add a Back Functionality

  // TODO Fix Modal Header if you didnt go back it will remain the same state

  // TODO Try using Grid
  return (
    <Card className={classes['card-form']}>
      <h1 className={classes['form-header']}>Meal Order Form</h1>
      <form>
        <div className={classes.flexForm}>
          <OrderFormInput
            dataType={fnameDataType}
            error={firstNameError}
            label="First Name"
            errMsg="must not be empty"
          ></OrderFormInput>
          <OrderFormInput
            dataType={lnameDataType}
            error={lastNameError}
            label="Last Name"
            errMsg="must not be empty"
          ></OrderFormInput>
        </div>
      </form>
      <div className={classes.actions}>
        <button className={classes['button--alt']}>Back</button>

        <button type="submit" className={classes.button}>
          Submit
        </button>
      </div>
    </Card>
  );
};

export default OrderForm;
