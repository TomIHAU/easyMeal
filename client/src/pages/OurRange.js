import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

export default function OurRange() {
  const { loading, error, data } = useQuery(QUERY_MEALS);

  console.log(data);
  const meals = data?.meals;
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
      {meals &&
        meals.map((meal) => {
          return (
            <div>
              <p>{meal.mealName}</p>
            </div>
          );
        })}
    </div>
  );
}
