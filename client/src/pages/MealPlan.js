import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

import { mealsArray } from "../temp/mealsArray";
import PlanMeal from "../components/PlanMeal";

export default function MealPlan() {
  const { loading, data } = useQuery(QUERY_MEALS);

  console.log("mealplan page");
  console.log(data);
  console.log(loading);
  const days = [1, 2, 3, 4, 5];
  const meals = [1, 2, 3, 4, 5];

  useEffect(() => {
    console.log(data);
    console.log(loading);
    if (data) {
    }
  }, [data, loading]);

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
          <div className="dayMeals">
            {mealsArray.map((meal) => (
              <PlanMeal meal={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
