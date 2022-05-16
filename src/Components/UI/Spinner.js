import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => {
  return (
    <p className={props.className}>
      {props.children}
      <span className={classes.spinner} />
    </p>
  );
};

export default Spinner;
