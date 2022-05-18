import React from 'react';

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
    <div className={classes.inputFlex}>
      <label htmlFor={inputDataType.id} className={inputClass.label}>
        {label}
      </label>
      <input
        className={inputClass.input}
        ref={props.inputRef}
        {...inputDataType}
      />
      {errorContent}
    </div>
  );
};

export default OrderFormInput;
