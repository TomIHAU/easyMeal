import React from "react";

export default function SingleMenuMeal({ meal }) {
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
      </div>
    </div>
  );
}
