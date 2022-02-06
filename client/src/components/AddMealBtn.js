import React from "react";
import { useDispatch } from "react-redux";
import { RANDOM_DAY_PLAN } from "../utils/GlobalState/actions";
import { BsShuffle } from "react-icons/bs";

import { Link } from "react-router-dom";

export default function AddMealBtn({ dayIndex, mealIndex }) {
  const dispatch = useDispatch();
  function handleRandomItem() {
    dispatch({ type: RANDOM_DAY_PLAN, dayIndex, mealIndex });
  }
  return (
    <div>
      <div className="planMeal addMealBtn">
        <Link to={`/plan/add/${dayIndex}/${mealIndex}`}>
          <div className="planMealTop addMealTop">
            <h3 className="planMealChoose">Choose Another Meal To Add.</h3>
          </div>{" "}
        </Link>
        <div
          className="planMealBot planMealBotChoose addMealTop"
          onClick={handleRandomItem}
        >
          <h3 className="planMealChoose ">Random Meal</h3>
          <BsShuffle></BsShuffle>
        </div>
      </div>
    </div>
  );
}
