import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_DAY_PLAN, RANDOM_DAY_PLAN } from "../utils/GlobalState/actions";
import { BsTrash, BsShuffle } from "react-icons/bs";

export default function PlanMeal({ meal, dayIndex, mealIndex }) {
  const dispatch = useDispatch();
  function handleRemoveItem() {
    dispatch({ type: REMOVE_DAY_PLAN, dayIndex, mealIndex });
  }
  function handleRandomItem() {
    dispatch({ type: RANDOM_DAY_PLAN, dayIndex, mealIndex });
  }
  return (
    <div className="planMeal">
      <div className="planMealTop">
        <img src={meal.img} alt={meal.mealName}></img>
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
        <div className="planIcon">
          <BsShuffle
            className="planIconBtn"
            onClick={() => {
              handleRandomItem();
            }}
          />
          <BsTrash
            className="planIconBtn"
            onClick={() => {
              handleRemoveItem();
            }}
          />
        </div>
      </div>
    </div>
  );
}
