import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

import { mealsArray } from "../temp/mealsArray";
import SinglePlanMeal from "../components/SinglePlanMeal";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

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

  const [daysOpen, setDaysOpen] = useState([
    { day: 1, isOpen: true, meals: [3, 1, 1, 1, 4] },
    { day: 2, isOpen: true, meals: [0, 1, 3, null, 4] },
    { day: 3, isOpen: true, meals: [2, 3, 2, 3, 4] },
    { day: 4, isOpen: true, meals: [null, null, null, null, 4] },
    { day: 5, isOpen: true, meals: [null, null, null, null, null] },
  ]);

  const handleShowDay = (event) => {
    setDaysOpen(
      daysOpen.map((day, index) => {
        const id = parseInt(event.target.id);
        if (index === id) {
          day.isOpen = !day.isOpen;
        }
        return day;
      })
    );
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
                onClick={handleShowDay}
                className="mealPlanShowBtn"
              />
            ) : (
              <BsChevronDown
                id={index}
                onClick={handleShowDay}
                className="mealPlanShowBtn"
              />
            )}
          </div>
          {day.isOpen && (
            <div className="dayMeals" style={{ transition: "0.5s" }}>
              {day.meals.map((meal, index) =>
                meal === null ? (
                  <p>this is null - replace with redirectbutton to menu page</p>
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
