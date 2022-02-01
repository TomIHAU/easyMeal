import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";
import { UPDATE_MEALS } from "../utils/GlobalState/actions";
import SortSelect from "../components/SortSelect";
import FilterForm from "../components/FilterForm";
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
  const state = useSelector((state) => state);

  const [searchResults, setSearchResults] = useState(state.meals);

  const dispatch = useDispatch();

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

  return (
    <div className="ourRangeOuter">
      <aside>
        <FilterForm />
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
