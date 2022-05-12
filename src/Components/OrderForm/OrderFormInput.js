import React from 'react';
import Input from '../UI/Input';

import classes from './OrderFormInput.module.css';

const OrderFormInput = props => {
  const inputDataType = props.dataType;
  const hasError = props.error;
  const label = props.label;
  const errMsg = props.errMsg;

  // Error Handling ClassName conditional
  const inputErrorClass = hasError
    ? `${classes['form-input']} ${classes.invalid}`
    : classes['form-input'];

  const inputLabelClass = hasError
    ? `${classes['form-input--label']} ${classes.error}`
    : classes['form-input--label'];

  // Error Handling Statement UI
  const errorContent = hasError && (
    <p className={classes.error}>
      {label} {errMsg}
    </p>
  );

  const inputClass = {
    inputBox: classes['form-input--box'],
    label: inputLabelClass,
    input: inputErrorClass,
  };

  return (
    <div>
      <Input type={inputDataType} className={inputClass} label={label}></Input>
      {errorContent}
    </div>
  );
};

export default OrderFormInput;
