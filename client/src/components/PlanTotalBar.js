import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PLAN_TO_CART,
  UPDATE_CART_QUANTITY,
} from "../utils/GlobalState/actions";

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
      acc.push({ ...state.meals[cur], purchaseQuantity: 1 });
      return acc;
    }, []);
  }
  function sort() {
    const leftOvers = products.reduce((acc, product) => {
      let inCart = false;
      state.cart.forEach((cartP) => {
        if (parseInt(product.id) === parseInt(cartP.id)) {
          dispatch({
            type: UPDATE_CART_QUANTITY,
            id: parseInt(product.id),
            purchaseQuantity:
              parseInt(cartP.purchaseQuantity) +
              parseInt(product.purchaseQuantity),
          });
          inCart = true;
        }
      });
      if (!inCart) {
        acc.push(product);
      }
      return acc;
    }, []);

    const consolidated = {};

    for (const num of leftOvers) {
      consolidated[num.id] = consolidated[num.id]
        ? consolidated[num.id] + 1
        : 1;
    }

    const otherProducts = [];

    for (const meal in consolidated) {
      otherProducts.push({
        ...state.meals[meal - 1],
        purchaseQuantity: consolidated[meal],
      });
    }
    return otherProducts;
  }
  function handleAddAllToCart() {
    const sortedProducts = sort();
    dispatch({ type: ADD_PLAN_TO_CART, products: sortedProducts });
  }
  return (
    calculateWeekTotal(daysOpen, "price", meals) > 0 && (
      <div className="totalPlan">
        <p>Carbs: {calculateWeekTotal(daysOpen, "carbs", meals)}</p>
        <p>Protein: {calculateWeekTotal(daysOpen, "protein", meals)}</p>
        <p>Fat: {calculateWeekTotal(daysOpen, "fat", meals)}</p>
        <p>Price: ${calculateWeekTotal(daysOpen, "price", meals).toFixed(2)}</p>
        <button
          className="mainBannerBtn AddAllBtn"
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
