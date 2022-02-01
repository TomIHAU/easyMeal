import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";
import { UPDATE_MEALS } from "../utils/GlobalState/actions";
import SortSelect from "../components/SortSelect";
import FilterForm from "../components/FilterForm";
import SingleMenuMeal from "../components/SingleMenuMeal";
import MoreDetailsMeal from "../components/MoreDetailsMeal";

function filterResults(arr, args) {
  console.log("in filter", arr);
  console.log(args);
  return arr.filter((ele) => {
    for (let i = 0; i < args.length; i++) {
      console.log(args[i]);
      console.log(ele.mealName);
      console.log("should be one", args[i]);
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
    console.log("state.f", state.filters);
    console.log("state.g", ...state.filters);
    const filtered = filterResults(state.meals, state.filters);
    console.log("out filter", filtered);
    const sorted = sortResults(filtered, state.sort);
    setSearchResults(sorted);
  }, [state.sort, state.filters, state.meals]);

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
              <div
                className="planMeal"
                onClick={() => handleShowMoreDetails(meal.id)}
              >
                <SingleMenuMeal key={meal.id} meal={meal} mealId={meal.id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
