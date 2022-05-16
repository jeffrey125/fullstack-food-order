import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';

import HeaderCardButton from './HeaderCardButton';

const Header = props => {
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.headerTitle}>Food Order App</h1>
        <HeaderCardButton onShowModal={props.onShowModal} />
      </header>
      ;
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of meals." />
      </div>
    </>
  );
};

export default Header;
