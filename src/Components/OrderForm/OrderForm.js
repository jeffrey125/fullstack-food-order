import React, { useReducer } from 'react';
import classes from './OrderForm.module.css';

import Input from '../UI/Input';

const OrderForm = props => {
  const [foodOrderIsValid, setFoodOrderIsValid] = useState(false);

  // Input for First Name

  // Input for Last Name

  // Input for Address

  // Input for contact number

  return (
    <>
      <form>
        <Input></Input>
      </form>
    </>
  );
};

export default OrderForm;
