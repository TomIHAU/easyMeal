import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

import { UPDATE_MEALS } from "../utils/GlobalState/actions";

import SortSelect from "../components/SortSelect";
import FilterForm from "../components/FilterForm";
import SingleAddMeal from "../components/SingleAddMeal";
import MoreDetailsMeal from "../components/MoreDetailsMeal";
import PlanTotalBar from "../components/PlanTotalBar";
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

export default function PlanAdd() {
  const { dayIndex, mealIndex } = useParams();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [MoreDetails, setMoreDetails] = useState({ show: false, meal: 0 });
  const daysOpen = state.plan;

  const [searchResults, setSearchResults] = useState(state.meals);

  const { data } = useQuery(QUERY_MEALS);

  console.log(state.cart);
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
      <div className="ourRange">
        <h2 className="ourRangeHeader">Our Range of meals</h2>
        <FilterForm />
        <div>
          <SortSelect />
          <div className="mealsContainer">
            {searchResults.map((meal) => {
              return (
                <SingleAddMeal
                  key={meal.id}
                  dayIndex={dayIndex}
                  mealIndex={mealIndex}
                  meal={meal}
                  handleShowMoreDetails={handleShowMoreDetails}
                />
              );
            })}
          </div>
        </div>
      </div>
      <PlanTotalBar daysOpen={daysOpen} meals={data?.meals} />
    </div>
  );
}
