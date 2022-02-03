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
    let productTemp = products;
    let cartTemp = state.cart;
    for (let i = 0; i < productTemp.length; i++) {
      let inCart = false;
      for (let j = 0; j < cartTemp; j++) {
        if (productTemp[i].id === cartTemp.id) {
          inCart = true;
          cartTemp.purchaseQuantity += 1;
        }
      }
      if (!inCart) {
        productTemp[i].purchaseQuantity = 1;
        cartTemp.push(productTemp[i]);
      }
    }
    return cartTemp;
  }
  function handleAddAllToCart() {
    // console.log("hello");
    // const sortedProducts = sort();
    // console.log(sortedProducts);
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
