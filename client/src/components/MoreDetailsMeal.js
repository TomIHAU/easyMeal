import React from "react";

import { useSelector } from "react-redux";

export default function MoreDetailsMeal({ mealId, setMoreDetails, addToCart }) {
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
      <img src={`${enhance.img}`} alt="" />
      <p>{enhance.fat}</p>
      <p>{enhance.protein}</p>
      <p>{enhance.carbs}</p>
      <p>{enhance.mealName}</p>
      <button
        onClick={() => {
          addToCart(enhance);
        }}
      >
        Add to Cart
      </button>
      <button onClick={handleOnChange}>Close</button>
    </div>
  );
}
