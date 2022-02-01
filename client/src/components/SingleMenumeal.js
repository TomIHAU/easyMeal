import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SingleMenuMeal({
  meal,
  handleShowMoreDetails,
  addToCart,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <div>
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
        <button onClick={() => handleShowMoreDetails(meal.id)}>
          ShowMoreDetails
        </button>
        <button
          onClick={() => {
            addToCart(meal);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
