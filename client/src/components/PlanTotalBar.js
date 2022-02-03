import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PLAN_TO_CART } from "../utils/GlobalState/actions";

function calculateDayTotal(arr, key, meals) {
  if (meals) {
    return arr.reduce((acc, cur) => {
      if (cur !== null) {
        acc += meals[cur][key];
      }
      return acc;
    }, 0);
  }
}

function calculateWeekTotal(arr, key, meals) {
  return arr.reduce((acc, cur) => {
    acc += calculateDayTotal(cur.meals, key, meals);
    return acc;
  }, 0);
}

export default function PlanTotalBar({ daysOpen, meals }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const productsId = daysOpen.reduce((acc, cur) => {
    acc.push(...cur.meals.filter((meal) => meal != null));

    return acc;
  }, []);
  let products;
  if (state.meals) {
    products = productsId.reduce((acc, cur) => {
      acc.push(state.meals[cur]);
      return acc;
    }, []);
  }
  function sort() {
    let allProducts = [...state.cart, ...products];
    let noDubs = [];
    for (let i = 0; i < allProducts.length; i++) {
      noDubs[allProducts[i].id] = 1;
      if (allProducts[i].purchaseQuantity) {
      }
    }
  }
  function handleAddAllToCart() {
    console.log(products);
    dispatch({ type: ADD_PLAN_TO_CART, products });
  }
  return (
    calculateWeekTotal(daysOpen, "price", meals) > 0 && (
      <div className="totalPlan">
        <p>Carbs: {calculateWeekTotal(daysOpen, "carbs", meals)}</p>
        <p>Protein: {calculateWeekTotal(daysOpen, "protein", meals)}</p>
        <p>Fat: {calculateWeekTotal(daysOpen, "fat", meals)}</p>
        <p>Price: ${calculateWeekTotal(daysOpen, "price", meals).toFixed(2)}</p>
        <button
          onClick={() => {
            handleAddAllToCart();
          }}
        >
          Add To Cart
        </button>
      </div>
    )
  );
}
