import React from 'react';

const OrderFormAddress = props => {
  if (!props && !props.className) return;

  const {
    select,
    label,
    inputFlex: formInputFlex,
    error,
    invalid,
    option,
  } = props.className;
  const hasError = props.hasError;
  const addressData = props.address;
  const errMsg = props.errMsg;
  const fetchHasError = props.fetchHasError;

  const labelName = props.name[0].toUpperCase() + props.name.slice(1);

  const placeHolder = props.isLoading
    ? `--Data is Loading--`
    : `--Please select a ${labelName}--`;

  // Error Message
  const errorContent = hasError ? (
    <p className={error}>{`${labelName} must not be empty`}</p>
  ) : null;

  const errorFetchContent = fetchHasError ? (
    <p className={error}>{errMsg}</p>
  ) : null;

  // Error Conditional Class
  const selectClass = hasError ? `${select} ${invalid}` : select;

  const labelClass = hasError ? `${label} ${error}` : label;

  return (
    <div className={formInputFlex}>
      <label htmlFor={props.name} className={labelClass}>
        {labelName}
      </label>
      <select
        name={props.name}
        id={props.name}
        disabled={props.disabled}
        className={selectClass}
        onChange={props.onChangeAddress}
        onBlur={props.onBlurAddress}
        value={props.value}
      >
        <option value="" className={option}>
          {placeHolder}
        </option>
        {addressData.map((add, i) => {
          const optionClean = add.replaceAll('-', ' ');

          return (
            <option key={i} value={add} className={option}>
              {optionClean.toUpperCase()}
            </option>
          );
        })}
      </select>
      {errorContent || errorFetchContent}
    </div>
  );
};

export default OrderFormAddress;
