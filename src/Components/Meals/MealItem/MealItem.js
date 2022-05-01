import React from 'react';
import classes from './MealItem.module.css';

import MealItemForm from './MealItemForm';

const MealItem = props => {
  const meal = props.meals.map(mealData => {
    return (
      <li key={mealData.id} className={classes.meal}>
        <div>
          <h3>{mealData.name}</h3>
          <p className={classes.description}>{mealData.description}</p>
          <p className={classes.price}>${mealData.price.toFixed(2)}</p>
        </div>
        <div>
          <MealItemForm id={mealData.id} />
        </div>
      </li>
    );
  });

  return meal;
};

export default MealItem;
