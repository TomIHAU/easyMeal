import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

import SingleMenuMeal from "../components/SingleMenuMeal";

export default function OurRange() {
  const { loading, error, data } = useQuery(QUERY_MEALS);

  console.log(data);
  const meals = data?.meals;
  console.log(meals);
  if (loading)
    return (
      <div className="ourRange">
        <p>loading . . .</p>
      </div>
    );

  if (error) return `Error! ${error.message}`;

  return (
    <div className="ourRange">
      <p>Our Range</p>
      <div className="mealsContainer">
        {meals &&
          meals.map((meal) => {
            return (
              <SingleMenuMeal key={meal.id} meal={meal} mealId={meal.id} />
            );
          })}
      </div>
    </div>
  );
}
