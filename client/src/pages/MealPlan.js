import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";
import { UPDATE_MEALS } from "../utils/GlobalState/actions";

import AddMealBtn from "../components/AddMealBtn";
import SinglePlanMeal from "../components/SinglePlanMeal";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { TOGGLE_SHOW_DAY } from "../utils/GlobalState/actions";
import PlanTotalBar from "../components/PlanTotalBar";

function calculateDayTotal(arr, key, meals) {
  if (meals) {
    return arr.reduce((acc, cur) => {
      if (cur !== null) {
        acc += meals[cur][key];
      }
      return acc;
    }, 0);
  }
}

export default function MealPlan() {
  const { loading, data } = useQuery(QUERY_MEALS);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(data);
  console.log(state);
  useEffect(() => {
    if (data) {
      const meals = data.meals;
      dispatch({ type: UPDATE_MEALS, meals });
    }
  }, [data, dispatch]);
  const daysOpen = state.plan;

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
              <p>Carbs: {calculateDayTotal(day.meals, "carbs", data?.meals)}</p>
              <p>Fat: {calculateDayTotal(day.meals, "fat", data?.meals)}</p>
              <p>Pro: {calculateDayTotal(day.meals, "protein", data?.meals)}</p>
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
          {day.isOpen && data.meals && (
            <div className="dayMeals" style={{ transition: "0.5s" }}>
              {day.meals.map((meal, index) =>
                meal === null ? (
                  <AddMealBtn dayIndex={day.day} mealIndex={index} />
                ) : (
                  <SinglePlanMeal
                    key={index + day.day}
                    meal={data?.meals[meal]}
                    mealIndex={index}
                    dayIndex={day.day}
                  />
                )
              )}
            </div>
          )}
        </div>
      ))}
      <PlanTotalBar daysOpen={daysOpen} meals={data?.meals} />
    </div>
  );
}
