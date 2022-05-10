import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => {
  console.log(props);
  return (
    <p className={`${classes.paragraph} ${props.className}`}>
      {props.children}
    </p>
  );
};

export default Spinner;
