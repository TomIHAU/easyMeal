import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

import { mealsArray } from "../temp/mealsArray";
import AddMealBtn from "../components/AddMealBtn";
import SinglePlanMeal from "../components/SinglePlanMeal";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { TOGGLE_SHOW_DAY } from "../utils/GlobalState/actions";

function calculateDayTotal(arr, key) {
  return arr.reduce((acc, cur) => {
    if (cur !== null) {
      acc += mealsArray[cur][key];
    }
    return acc;
  }, 0);
}

function calculateWeekTotal(arr, key) {
  return arr.reduce((acc, cur) => {
    acc += calculateDayTotal(cur.meals, key);
    return acc;
  }, 0);
}

export default function MealPlan() {
  const { loading, data } = useQuery(QUERY_MEALS);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state);
  const daysOpen = state.plan;
  console.log(state);
  const handleShowDay = (index) => {
    dispatch({ type: TOGGLE_SHOW_DAY, index });
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="mealPlan">
      {daysOpen.map((day, index) => (
        <div key={day.day} className="day">
          <div className="dayHeader">
            <h2>Day {day.day}</h2>
            <div className="dayInfo">
              <p>Carbs: {calculateDayTotal(day.meals, "carbs")}</p>
              <p>Fat: {calculateDayTotal(day.meals, "fat")}</p>
              <p>Pro: {calculateDayTotal(day.meals, "protein")}</p>
            </div>
            {day.isOpen ? (
              <BsChevronUp
                id={index}
                onClick={() => handleShowDay(index)}
                className="mealPlanShowBtn"
              />
            ) : (
              <BsChevronDown
                id={index}
                onClick={() => handleShowDay(index)}
                className="mealPlanShowBtn"
              />
            )}
          </div>
          {day.isOpen && (
            <div className="dayMeals" style={{ transition: "0.5s" }}>
              {day.meals.map((meal, index) =>
                meal === null ? (
                  <AddMealBtn dayIndex={day.day} mealIndex={index} />
                ) : (
                  <SinglePlanMeal
                    key={index + day.day}
                    meal={data.meals[meal]}
                  />
                )
              )}
            </div>
          )}
        </div>
      ))}
      <div className="totalPlan">
        <p>carbs:{calculateWeekTotal(daysOpen, "carbs")}</p>
        <p>protein:{calculateWeekTotal(daysOpen, "protein")}</p>
        <p>fat:{calculateWeekTotal(daysOpen, "fat")}</p>
        <p>total price: ${calculateWeekTotal(daysOpen, "price")}</p>
        <p>asdfsadfasd</p>
      </div>
    </div>
  );
}
