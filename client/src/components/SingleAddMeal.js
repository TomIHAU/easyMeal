import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_DAY_PLAN } from "../utils/GlobalState/actions";
import { Link } from "react-router-dom";

export default function SingleAddMeal({
  meal,
  handleShowMoreDetails,
  dayIndex,
  mealIndex,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  function handleChangePlan() {
    dispatch({ type: UPDATE_DAY_PLAN, mealId: meal.id, dayIndex, mealIndex });
  }
  return (
    <div className="planMeal">
      <div className="planMealTop">
        <img
          src={meal.img}
          alt={meal.mealName}
          onClick={() => handleShowMoreDetails(meal.id)}
        ></img>
      </div>
      <div className="planMealBot">
        <div className="planMealBotHeader">
          <h3>{meal.mealName}</h3>
        </div>
        <div className="planMealPrice">
          <p>${meal.price}</p>
        </div>
        <div className="planMealStats">
          <p>C:{meal.carbs}</p>
          <p>F:{meal.fat}</p>
          <p>P:{meal.protein}</p>
        </div>
        <div className="ourRangeAdd">
          <Link
            to="/plan"
            className="mainBannerBtn ourRangeAddBtn"
            onClick={() => {
              handleChangePlan();
            }}
          >
            Add to Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
