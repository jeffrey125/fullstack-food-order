import { useState } from 'react';

const useInput = validateValue => {
  const [value, setValue] = useState('');
  const [enteredTouched, setEnteredTouched] = useState(false);

  const isValueValid = validateValue(value);
  const hasError = !isValueValid && enteredTouched;

  const valueChangeHandler = e => {
    setValue(e.target.value);
  };

  const valueInputBlurHandler = () => {
    setEnteredTouched(true);
  };

  const valueReset = (value, boolean) => {
    setValue(value);
    setEnteredTouched(boolean);
  };

  return {
    value,
    isValueValid,
    hasError,
    valueChangeHandler,
    valueInputBlurHandler,
    valueReset,
  };
};

export default useInput;
