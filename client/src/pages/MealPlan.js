import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

import { mealsArray } from "../temp/mealsArray";

export default function MealPlan() {
  const { data, loading } = useQuery(QUERY_MEALS);
  console.log(data);
  console.log(loading);
  const days = [1, 2, 3, 4, 5];
  const meals = [1, 2, 3, 4, 5];
  return (
    <div className="mealPlan">
      {days.map((day) => (
        <div className="day">
          <div className="dayHeader">
            <h2>Day {day}</h2>
            <div className="dayInfo">
              <p>Cal</p>
              <p>Fat</p>
              <p>Pro</p>
            </div>
          </div>
          <div className="dayMeals"></div>
        </div>
      ))}
      {mealsArray.map((meal) => (
        <div>
          <p>sadflksadlfhaksfhdla</p>
          <h1>{meal.mealName}</h1>
        </div>
      ))}
    </div>
  );
}
