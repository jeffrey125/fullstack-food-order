import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './OrderForm.module.css';

import useInput from '../../hooks/use-input';
import OrderFormInput from './OrderFormInput';
import OrderFormAddress from './OrderFormAddress';
import CartContext from '../../store/cart-context';
import Card from '../UI/Card';

const OrderForm = props => {
  // Cart Context to access Order
  const ctx = useContext(CartContext);

  // Init for Clicking Back reset
  let backReset = false;

  // Overall Form validity
  let foodOrderIsValid = false;

  // Input Validity Checker
  const inputNotEmpty = value => value.trim().length !== 0;
  const mustBeNumber = value => {
    if (value.match(/^(\+\d{1,3}[- ]?)?\d{11}$/) && !value.match(/0{5,}/)) {
      return true;
    } else {
      return false;
    }
  };

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

  // Address array from server
  const addressArr = props.address;
  const isLoading = props.isLoading;
  const fetchHasError = props.fetchHasError;
  const errMsg = props.errMsg;

  const addressClass = {
    label: classes.label,
    select: classes.select,
    error: classes.error,
    invalid: classes.invalid,
    inputFlex: classes.inputFlex,
  };

  const {
    value: selectedProvince,
    isValueValid: selectedProvinceValid,
    hasError: selectedProvinceError,
    valueChangeHandler: provinceChangeHandler,
    valueInputBlurHandler: provinceBlur,
    valueReset: provinceReset,
  } = useInput(inputNotEmpty);

  // Province Data
  const provinceData = addressArr.map(arr => arr.province);

  // Selected Province
  const selectedProvinceArr = addressArr.filter(
    arr => arr.province === selectedProvince
  );

  // Street Data
  const noProvince = !selectedProvince ? true : false;
  const {
    value: streetValue,
    isValueValid: streetValid,
    hasError: streetError,
    valueChangeHandler: streetChangeHandler,
    valueInputBlurHandler: streetBlur,
    valueReset: streetReset,
  } = useInput(inputNotEmpty);

  const streetDataType = {
    id: 'street',
    type: 'text',
    value: streetValue,
    disabled: noProvince,
    placeholder: noProvince ? `--Please select a Province first--` : null,
    onChange: streetChangeHandler,
    onBlur: streetBlur,
  };

  // City Data (Conditional Option)
  const {
    value: selectedCity,
    isValueValid: selectedCityValid,
    hasError: selectedCityError,
    valueChangeHandler: cityChangeHandler,
    valueInputBlurHandler: cityBlur,
    valueReset: cityReset,
  } = useInput(inputNotEmpty);

  const cityFilteredData = selectedProvinceArr.flatMap(addObj => {
    let cities = [];
    addObj.cities.forEach(cityObj => cities.push(cityObj.city));

    return cities;
  });

  // Barangay Data (Conditional Option)
  const noCity = !selectedCity ? true : false;
  const barFilteredData = selectedProvinceArr
    .flatMap(provObj => provObj.cities)
    .filter(cityArr => cityArr.city === selectedCity)
    .flatMap(filterCity => filterCity.barangay);

  const {
    value: selectedBarangay,
    isValueValid: selectedBarangayValid,
    hasError: selectedBarangayError,
    valueChangeHandler: barangayChangeHandler,
    valueInputBlurHandler: barangayBlur,
    valueReset: barangayReset,
  } = useInput(inputNotEmpty);

  // Input for contact number
  const {
    value: mobileNumberValue,
    isValueValid: mobileNumberValid,
    hasError: mobileNumberError,
    valueChangeHandler: mobileNumberChangeHandler,
    valueInputBlurHandler: mobileNumberBlur,
    valueReset: mobileNumberReset,
  } = useInput(mustBeNumber);

  const mobileNumberDataType = {
    id: 'mobile-number',
    type: 'tel',
    value: mobileNumberValue,
    onChange: mobileNumberChangeHandler,
    onBlur: mobileNumberBlur,
  };

  // Send POST HTTP

  // Add a Back Functionality (will redirect you back to available meals)

  // TODO Fix Modal Header if you didnt go back it will remain the same state

  // TODO Try using Grid

  // Form Is Valid Checker
  if (
    firstNameValid &&
    lastNameValid &&
    selectedProvinceValid &&
    streetValid &&
    selectedCityValid &&
    selectedBarangayValid &&
    mobileNumberValid
  ) {
    foodOrderIsValid = true;
  }

  // Submit Handler
  const submitFormHandler = e => {
    e.preventDefault();

    if (!foodOrderIsValid) return;

    // Props to be sent in App.js for POST method
    const foodOrderData = {
      orderId: `order-${uuidv4().slice(0, 4)}`,
      firstName: firstNameValue,
      lastName: lastNameValue,
      province: selectedProvince,
      street: streetValue,
      city: selectedCity,
      barangay: selectedBarangay,
      mobileNumber: mobileNumberValue,
      items: ctx.items,
      totalAmount: ctx.totalAmount,
    };
    props.onSendFoodOrderData(foodOrderData, foodOrderData.orderId);

    // Form Reset
    firstNameReset('', false);
    lastNameReset('', false);
    provinceReset('', false);
    streetReset('', false);
    cityReset('', false);
    barangayReset('', false);
    mobileNumberReset('', false);

    // Hides Form on Submit
    props.onHideForm();

    // Clears Session Storage and reverts to default Cart State
    ctx.reset();
    sessionStorage.clear();
  };

  // Hide Form
  const hideFormHandlerReset = () => {
    backReset = true;
    props.onHideForm();
  };

  // Reset form when back is clicked
  if (backReset) {
    firstNameReset('', false);
    lastNameReset('', false);
    provinceReset('', false);
    streetReset('', false);
    cityReset('', false);
    barangayReset('', false);
    mobileNumberReset('', false);
    backReset = false;
  }

  return (
    <Card className={classes['card-form']}>
      <h1 className={classes['form-header']}>Meal Order Form</h1>
      <form
        onSubmit={submitFormHandler}
        className={classes['form-containerFlex']}
      >
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

        <OrderFormAddress
          name="province"
          value={selectedProvince}
          onChangeAddress={provinceChangeHandler}
          onBlurAddress={provinceBlur}
          className={addressClass}
          disabled={false}
          errMsg={errMsg}
          fetchHasError={fetchHasError}
          isLoading={isLoading}
          hasError={selectedProvinceError}
          address={provinceData}
        ></OrderFormAddress>
        <OrderFormInput
          dataType={streetDataType}
          error={streetError}
          label="Street"
          errMsg="must not be empty"
        ></OrderFormInput>
        <OrderFormAddress
          name="city"
          value={selectedCity}
          onChangeAddress={cityChangeHandler}
          onBlurAddress={cityBlur}
          className={addressClass}
          disabled={noProvince}
          errMsg={errMsg}
          fetchHasError={fetchHasError}
          isLoading={isLoading}
          hasError={selectedCityError}
          address={cityFilteredData}
        ></OrderFormAddress>
        <OrderFormAddress
          name="barangay"
          value={selectedBarangay}
          onChangeAddress={barangayChangeHandler}
          onBlurAddress={barangayBlur}
          className={addressClass}
          disabled={noCity}
          errMsg={errMsg}
          fetchHasError={fetchHasError}
          isLoading={isLoading}
          hasError={selectedBarangayError}
          address={barFilteredData}
        ></OrderFormAddress>

        <OrderFormInput
          dataType={mobileNumberDataType}
          error={mobileNumberError}
          label="Mobile Number"
          errMsg="must be 11-digits"
        ></OrderFormInput>

        <div className={classes.actions}>
          <button
            type="button"
            className={classes['button--alt']}
            onClick={hideFormHandlerReset}
          >
            Back
          </button>

          <button
            type="submit"
            className={classes.button}
            disabled={!foodOrderIsValid}
          >
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
};

export default OrderForm;
