import React from "react";
import { Link } from "react-router-dom";

export default function NavGroup() {
  return (
    <Link to="/plan/add">
      <div className="planMeal addMealBtn">
        <div className="planMealTop addMealTop">
          <h3 className="planMealChoose">Choose Another Meal To Add.</h3>
        </div>
        <div className="planMealBot planMealBotChoose"></div>
      </div>
    </Link>
  );
}
