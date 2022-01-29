import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

import { mealsArray } from "../temp/mealsArray";
import SinglePlanMeal from "../components/SinglePlanMeal";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
export default function MealPlan() {
  const { loading, data } = useQuery(QUERY_MEALS);

  const [daysOpen, setDaysOpen] = useState([
    { day: 1, isOpen: true },
    { day: 2, isOpen: true },
    { day: 3, isOpen: true },
    { day: 4, isOpen: true },
    { day: 5, isOpen: true },
  ]);

  console.log("data", data);
  console.log("loading", loading);

  const meals = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (data) {
    }
  }, [data, loading]);

  const handleShowDay = (event) => {
    setDaysOpen(
      daysOpen.map((day, index) => {
        if (index == event.target.id) {
          day.isOpen = !day.isOpen;
        }
        return day;
      })
    );
  };

  return (
    <div className="mealPlan">
      {daysOpen.map((day, index) => (
        <div key={day.day} className="day">
          <div className="dayHeader">
            <h2>Day {day.day}</h2>
            <div className="dayInfo">
              <p>Cal</p>
              <p>Fat</p>
              <p>Pro</p>
            </div>

            <div id={index} onClick={handleShowDay}>
              {day.isOpen ? <BsChevronUp /> : <BsChevronDown />}
            </div>
          </div>
          {day.isOpen && (
            <div className="dayMeals" style={{ transition: "0.5s" }}>
              {mealsArray.map((meal, index) => (
                <SinglePlanMeal key={index + day.day} meal={meal} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
