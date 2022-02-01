import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";
import { UPDATE_MEALS, UPDATE_FILTER } from "../utils/GlobalState/actions";

import SortSelect from "../components/SortSelect";
import SingleMenuMeal from "../components/SingleMenuMeal";

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
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { loading, error, data } = useQuery(QUERY_MEALS);
  const [searchResults, setSearchResults] = useState(state.meals);

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

  function handleSearch(...args) {
    dispatch({ type: UPDATE_FILTER, filters: args });
  }

  if (loading)
    return (
      <div className="ourRange">
        <p>loading . . .</p>
      </div>
    );

  if (error) return `Error! ${error.message}`;

  return (
    <div className="ourRangeOuter">
      <aside>
        <h2 onClick={(event) => handleSearch("Spam", "Chicken")}>
          this is to filter stuff
        </h2>
      </aside>
      <div className="ourRange">
        <h2>Our Range this is to sort stuff</h2>
        <SortSelect />

        <div className="mealsContainer">
          {searchResults.map((meal) => {
            return (
              <SingleMenuMeal key={meal.id} meal={meal} mealId={meal.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
