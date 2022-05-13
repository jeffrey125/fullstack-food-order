import React, { useState, useEffect, useCallback } from 'react';
import { FIREBASE_API } from '../../utils/constant';
import classes from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import Spinner from '../UI/Spinner';

const AvailableMeals = () => {
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Meal Data on Firebase
  // Ensures the function doesn't recreate
  const fetchMealsData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${FIREBASE_API}/meals.json`);

      // Error Handling
      if (!response.ok) {
        throw new Error(`Something went wrong Error code: ${response.status}`);
      }

      const data = await response.json();

      let mealsData = [];

      for (const mealID in data) {
        mealsData.push({ id: mealID, ...data[mealID] });
      }

      setMealData(mealsData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [FIREBASE_API]);

  useEffect(() => {
    fetchMealsData();
  }, [fetchMealsData]);

  // Error Message UI
  const errorMessage = <p className={classes.mealParagraph}>{error}</p>;

  // Loader UI
  const loader = (
    <Spinner className={classes.mealParagraph}>Meals are Loading</Spinner>
  );

  // No Meal Data UI
  const noMealData = <p className={classes.mealParagraph}>No Meal Data.</p>;

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          <div
            className={
              !isLoading && (mealData.length === 0 || error)
                ? classes.show
                : classes.hidden
            }
          >
            {!isLoading && mealData.length === 0 && !error
              ? noMealData
              : errorMessage}
          </div>
          {isLoading ? loader : <MealItem meals={mealData} />}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
