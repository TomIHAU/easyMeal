import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";
import {
  UPDATE_MEALS,
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
} from "../utils/GlobalState/actions";
import SortSelect from "../components/SortSelect";
import FilterForm from "../components/FilterForm";
import SingleMenuMeal from "../components/SingleMenuMeal";
import MoreDetailsMeal from "../components/MoreDetailsMeal";

function filterResults(arr, args) {
  return arr.filter((ele) => {
    for (let i = 0; i < args.length; i++) {
      if (args[i] === ele.mealName) {
        return false;
      }
    }
    return true;
  });
}
function sortResults(arr, arg) {
  if (arg === undefined) {
    return;
  }
  return arr.sort((a, b) => {
    return a[arg] - b[arg];
  });
}

export default function OurRange() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [MoreDetails, setMoreDetails] = useState({ show: false, meal: 0 });

  const [searchResults, setSearchResults] = useState(state.meals);
  const { data } = useQuery(QUERY_MEALS);

  useEffect(() => {
    if (data) {
      const meals = data.meals;
      dispatch({ type: UPDATE_MEALS, meals });
    }
  }, [data, dispatch]);

  useEffect(() => {
    const filtered = filterResults(state.meals, state.filters);
    const sorted = sortResults(filtered, state.sort);
    setSearchResults(sorted);
  }, [state.sort, state.filters, state.meals]);

  const { cart } = state;
  const addToCart = (meal) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === meal.id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        id: meal.id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      // idbPromise("cart", "put", {
      //   ...itemInCart,
      //   purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      // });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...meal, purchaseQuantity: 1 },
      });
      // idbPromise("cart", "put", { ...meal, purchaseQuantity: 1 });
    }
  };

  function handleShowMoreDetails(mealArg) {
    setMoreDetails({
      show: true,
      meal: mealArg,
    });
  }

  return MoreDetails.show ? (
    <MoreDetailsMeal
      mealId={MoreDetails.meal}
      setMoreDetails={setMoreDetails}
      addToCart={addToCart}
    />
  ) : (
    <div className="ourRangeOuter">
      <FilterForm />
      <div className="ourRange">
        <h2>Our Range this is to sort stuff</h2>
        <SortSelect />
        <div className="mealsContainer">
          {searchResults.map((meal) => {
            return (
              <div className="planMeal">
                <SingleMenuMeal
                  key={meal.id}
                  meal={meal}
                  mealId={meal.id}
                  addToCart={addToCart}
                  handleShowMoreDetails={handleShowMoreDetails}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
