import React from "react";

import { useDispatch, useSelector } from "react-redux";

export default function MoreDetailsMeal({ mealId, setMoreDetails }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let enhance = state.meals[mealId - 1];
  function handleOnChange() {
    setMoreDetails({
      show: false,
    });
  }

  return (
    <div>
      <h2 onClick={handleOnChange}>this is to A large meal stuff</h2>
      <h1>Meal Details</h1>
      <p>{enhance.fat}</p>
      <p>{enhance.mealName}</p>
    </div>
  );
}
