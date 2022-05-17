import React, { useState, useEffect, useCallback } from 'react';
import classes from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import Spinner from '../UI/Spinner';

const AvailableMeals = () => {
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    REACT_APP_FIREBASE_API_URL: FIREBASE_URL,
    REACT_APP_FIREBASE_API_KEY: FIREBASE_KEY,
  } = process.env;

  // Fetch Meal Data on Firebase
  // Ensures the function doesn't recreate
  const fetchMealsData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${FIREBASE_URL}/meals.json?key=${FIREBASE_KEY}`
      );

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
  }, [FIREBASE_URL, FIREBASE_KEY]);

  useEffect(() => {
    fetchMealsData();
  }, [fetchMealsData]);

  // Error Message UI
  const errorMessage = <p className={classes.mealParagraph}>{error}</p>;

  // Loader UI
  const loader = (
    <Spinner
      className={classes.mealParagraph}
      spinnerClass={classes.mediaSpinner}
    >
      Meals are Loading
    </Spinner>
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
